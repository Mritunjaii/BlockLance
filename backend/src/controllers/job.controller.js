const Job = require('../models/job.model');
const Application = require('../models/application.model');
const { 
  createJob, 
  getJobs, 
  getJobById, 
  applyForJob,
  acceptApplication
} = require('../services/job.service');

exports.createJob = async (req, res) => {
  try {
    const job = await createJob({
      ...req.body,
      client: req.user._id
    });
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await getJobs(req.query);
    res.send(jobs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    res.send(job);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const application = await applyForJob({
      jobId: req.params.id,
      freelancerId: req.user._id,
      message: req.body.message,
      proposedBudget: req.body.proposedBudget
    });
    res.status(201).send(application);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.acceptApplication = async (req, res) => {
  try {
    const { jobId, freelancerId } = req.params;
    const job = await acceptApplication(jobId, freelancerId, req.user._id);
    res.send(job);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.id })
      .populate('freelancer', 'username walletAddress rating completedJobs');
    res.send(applications);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};