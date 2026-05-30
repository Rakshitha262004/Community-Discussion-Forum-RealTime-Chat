import Message from '../models/Message.js';

export const handleSocketTraffic = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket Client Established Lifecycle Handshake: ${socket.id}`);

    socket.on('join_room', async ({ discussionId, username }) => {
      socket.join(discussionId);
      console.log(`User [${username}] securely moved into room vector [${discussionId}]`);

      try {
        const structuralHistory = await Message.find({ discussionId })
          .populate('sender', 'username')
          .sort({ createdAt: 1 })
          .limit(50);
        
        const mappedHistory = structuralHistory.map(msg => ({
          text: msg.text,
          sender: msg.sender ? msg.sender.username : 'Unknown',
          createdAt: msg.createdAt
        }));

        socket.emit('load_history', mappedHistory);
      } catch (err) {
        console.error('Failed reading historical message database logs:', err);
      }
    });

    socket.on('send_message', async ({ discussionId, senderId, username, text }) => {
      if (!text || text.trim() === '') return;
      try {
        await Message.create({ discussionId, sender: senderId, text });
        io.to(discussionId).emit('receive_message', {
          text,
          sender: username,
          createdAt: new Date()
        });
      } catch (err) {
        console.error('Socket DB compilation runtime fault:', err);
      }
    });

    socket.on('typing_state', ({ discussionId, username, isTyping }) => {
      socket.to(discussionId).emit('typing_broadcast', { username, isTyping });
    });

    socket.on('disconnect', () => {
      console.log(`Client Connection Severed Node Safe Lifecycle: ${socket.id}`);
    });
  });
};