const mongoose = require("mongoose");
const { CHAT_TYPE } = require("../const/const");

const ChatSchema = new mongoose.Schema({
  participants: {
    type: Array,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  ava: {
    type: String,
    default: ""
  },
  unreadCount: {
    type: Number,
    default: 0
  },
  lastInteraction: {
    type: String,
    default: "last interaction reference"
  },
  chatName: {
    required: true,
    type: String
    // default: `${RANDOM_PROP[(Math.random() * 10).toFixed(0)]} ${
    //   RANDOM_NAME[(Math.random() * 10).toFixed(0)]
    // }`
  },
  chatType: {
    type: Number,
    default: CHAT_TYPE.dialog
  },
  date: {
    type: Number,
    default: 0
  }
});

ChatSchema.statics.updateLastInteraction = function(chatId, msg, date) {
  return this.findOneAndUpdate({ _id: chatId }, { lastInteraction: msg, date }, { new: true });
};

ChatSchema.statics.createNewChat = async function(participants, type) {
  const sortedParticipants = participants.sort();

  const arr = await this.find({ participants: sortedParticipants });

  if (arr.length) {
    return arr[0];
  } else {
    return this.collection.insertOne({
      participants: sortedParticipants,
      chatName: "DialogName",
      chatType: type,
      ava: "",
      unreadCount: 0,
      lastInteraction: ""
    });
  }
};

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
