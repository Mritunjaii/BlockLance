const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { authenticate } = require('../middleware/auth');

router.post('/send', authenticate, chatController.sendMessage);
router.get('/:jobId', authenticate, chatController.getMessages);

module.exports = router;