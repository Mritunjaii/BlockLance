const jwt = require('jsonwebtoken');
const User = require('./src/models/user.model');

exports.setupWebSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        throw new Error('Authentication error');
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
      
      if (!user) {
        throw new Error('Authentication error');
      }
      
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });
  
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user._id}`);
    
    // Join room for each job the user is involved in
    socket.on('joinJob', (jobId) => {
      socket.join(jobId);
      console.log(`User ${socket.user._id} joined job ${jobId}`);
    });
    
    // Handle real-time messages
    socket.on('sendMessage', async ({ jobId, recipientId, content }, callback) => {
      try {
        const Message = require('./models/message.model');
        const Application = require('./models/application.model');
        
        // Validate the message
        const application = await Application.findOne({
          job: jobId,
          $or: [
            { freelancer: socket.user._id, client: recipientId },
            { freelancer: recipientId, client: socket.user._id }
          ]
        });
        
        if (!application) {
          throw new Error('You can only message participants of this job');
        }
        
        // Save message to database
        const message = new Message({
          job: jobId,
          sender: socket.user._id,
          recipient: recipientId,
          content
        });
        
        await message.save();
        
        // Emit to recipient
        io.to(jobId).emit('newMessage', {
          jobId,
          sender: socket.user._id,
          recipient: recipientId,
          content,
          createdAt: message.createdAt
        });
        
        callback({ success: true });
      } catch (error) {
        callback({ error: error.message });
      }
    });
    
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user._id}`);
    });
  });
};