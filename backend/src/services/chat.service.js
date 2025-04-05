const Message = require('../models/message.model');
const Application = require('../models/application.model');

exports.sendMessage = async ({ jobId, senderId, recipientId, content }) => {
  // Check if sender and recipient are part of the job
  const application = await Application.findOne({
    job: jobId,
    $or: [
      { freelancer: senderId, client: recipientId },
      { freelancer: recipientId, client: senderId }
    ]
  });
  
  if (!application) {
    throw new Error('You can only message participants of this job');
  }
  
  const message = new Message({
    job: jobId,
    sender: senderId,
    recipient: recipientId,
    content
  });
  
  await message.save();
  return message;
};

exports.getMessages = async (jobId, userId) => {
  return Message.find({
    job: jobId,
    $or: [
      { sender: userId },
      { recipient: userId }
    ]
  }).sort('createdAt').populate('sender recipient', 'username');
};