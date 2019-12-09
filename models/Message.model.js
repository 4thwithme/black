const mongoose = require('mongoose');


const MessageSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  }
});

MessageSchema.statics.getChatTimelineByChatId = function (chatId) {
 return this.find({'data.chatId': chatId}); 
};

const Message = mongoose.model('Message', MessageSchema);


module.exports = Message;