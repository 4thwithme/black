const mongoose = require('mongoose');
const { CHAT_TYPE, RANDOM_NAME, RANDOM_PROP } = require('../const/const');


const ChatSchema = mongoose.Schema({
  participants: {
    type: Array,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  ava: {
    type: String,
    required: true,
    default: "",
  },
  unreadCount: {
    required: true,
    type: Number,
    default: 0,
  },
  lastInteraction: {
    type: String,
    required: true,
    default: "last interaction reference"
  },
  chatName: {
    required: true,
    type: String,
    default: `${RANDOM_PROP[(Math.random() * 10).toFixed(0)]} ${RANDOM_NAME[(Math.random() * 10).toFixed(0)]}`
  },
  chatType: {
    required: true,
    type: Number,
    default: CHAT_TYPE.dialog
  },
});

ChatSchema.statics.updateLastInteraction = function (chatId, msg) {
  return this.findOneAndUpdate({ _id: chatId }, { lastInteraction: msg }, { new: true });
};

ChatSchema.statics.createNewChat = function (participants, type) {
  return console.log(participants, type)
};

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;