const Message = require('../models/message.model');
const { sendMessage, getMessages } = require('../services/chat.service');

exports.sendMessage = async (req, res) => {
  try {
    const { jobId, recipientId, content } = req.body;
    const message = await sendMessage({
      jobId,
      senderId: req.user._id,
      recipientId,
      content
    });
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await getMessages(req.params.jobId, req.user._id);
    res.send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};