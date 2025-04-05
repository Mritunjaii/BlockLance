const Job = require('../models/job.model');
const Application = require('../models/application.model');
const { createEscrowContract } = require('./contract.service');

exports.createJob = async (jobData) => {
  const job = new Job(jobData);
  await job.save();
  return job;
};

exports.getJobs = async (filters = {}) => {
  const query = { status: 'open' };
  
  if (filters.skills) {
    query.skillsRequired = { $in: filters.skills.split(',') };
  }
  
  if (filters.minBudget) {
    query.budget = { $gte: parseFloat(filters.minBudget) };
  }
  
  if (filters.maxBudget) {
    query.budget = query.budget || {};
    query.budget.$lte = parseFloat(filters.maxBudget);
  }
  
  return Job.find(query).populate('client', 'username walletAddress rating');
};

exports.getJobById = async (jobId) => {
  const job = await Job.findById(jobId).populate('client', 'username walletAddress rating');
  if (!job) {
    throw new Error('Job not found');
  }
  return job;
};

exports.applyForJob = async ({ jobId, freelancerId, message, proposedBudget }) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }
  
  if (job.status !== 'open') {
    throw new Error('Job is not open for applications');
  }
  
  const existingApplication = await Application.findOne({ job: jobId, freelancer: freelancerId });
  if (existingApplication) {
    throw new Error('You have already applied for this job');
  }
  
  const application = new Application({
    job: jobId,
    freelancer: freelancerId,
    message,
    proposedBudget
  });
  
  await application.save();
  return application;
};

exports.acceptApplication = async (jobId, freelancerId, clientId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }
  
  if (job.client.toString() !== clientId.toString()) {
    throw new Error('You are not authorized to accept applications for this job');
  }
  
  if (job.status !== 'open') {
    throw new Error('Job is not open for applications');
  }
  
  const application = await Application.findOne({ job: jobId, freelancer: freelancerId });
  if (!application) {
    throw new Error('Application not found');
  }
  
  // Create escrow contract
  const contractAddress = await createEscrowContract({
    clientAddress: job.client.walletAddress,
    freelancerAddress: application.freelancer.walletAddress,
    amount: job.budget,
    currency: job.currency
  });
  
  // Update job and application
  job.freelancer = freelancerId;
  job.status = 'in_progress';
  job.contractAddress = contractAddress;
  
  application.status = 'accepted';
  
  await Promise.all([job.save(), application.save()]);
  
  return job;
};