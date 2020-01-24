const express = require("express");

const auth = require("../middleware/auth");
const Chat = require("../models/Chat.model");
const { User } = require("../models/User.model");
const Message = require("../models/Message.model");
const { sendSocket } = require("../socket/socket");
const { CHAT_TYPE, SOCKET_TYPE } = require("../const/const");

const router = express.Router();

router.get(`/timeline/`, auth, async (req, res) => {
  if (!req.query.chatId) return res.sendStatus(400);

  const messages = await Message.getChatTimelineByChatId(
    req.query.chatId,
    parseInt(req.query.limit),
    parseInt(req.query.offset)
  );

  const reversedMesseges = messages.reverse();

  res.send(reversedMesseges);
});

router.get("/", auth, async (req, res) => {
  if (!Object.values(req.body).length) {
    const chats = [];

    const allUsers = await User.find({});
    const allChats = await Chat.find({}).sort({ date: -1 });

    const user = allUsers.find((user) => String(user._id) === req.user._id);
    const chatsIds = user.chats;

    allChats.forEach((chat) => {
      if (chatsIds.includes(chat._id)) {
        chats.push(chat);
      }
    });

    const getUsersForChat = (participants) => {
      const entites = {};

      participants.forEach((id) => {
        entites[id] = allUsers.find((user) => String(user._id) === id);
      });
      return entites;
    };

    const updatedChats = chats.map((chat) => {
      return {
        ...chat._doc,
        users: {
          ids: chat.participants,
          entities: getUsersForChat(chat.participants)
        }
      };
    });

    return res.send(updatedChats);
  } else if (req.body.id) {
    const user = await User.findById(req.user._id);

    return res.send(user);
  }
});

router.post("/", auth, async (req, res) => {
  if (!req.body && req.body.userId) return res.sendStatus(400);

  const participants = [req.user._id, req.body.userId];

  const newChat = await Chat.createNewChat(participants, CHAT_TYPE.dialog);

  const user1 = await User.findById(req.user._id);
  const user2 = await User.findById(req.body.userId);
  user1.chats.push(newChat.insertedId);
  user2.chats.push(newChat.insertedId);
  await user1.save();
  await user2.save();

  sendSocket(
    [String(user1._id), String(user2._id)],
    { chat: newChat.ops[0], participantsObjects: [user1, user2] },
    SOCKET_TYPE.newChat
  );

  res.sendStatus(200);
});

module.exports = router;
