const express = require("express");

const auth = require("../middleware/auth");
const Chat = require('../models/Chat.model');
const { User } = require('../models/User.model');
const Message =require('../models/Message.model');

const router = express.Router();

router.get(`/timeline/` , auth, async (req, res) => {
  if (!req.query.chatId) return res.sendStatus(400);

  const messages = await Message.getChatTimelineByChatId(
    req.query.chatId,
    parseInt(req.query.limit),
    parseInt(req.query.offset)
  );

  const reversedMesseges = messages.reverse();

  res.send(reversedMesseges);
});


router.get('/', auth, async (req, res) => {
  if (!Object.values(req.body).length) {
    const chats = [];
    
    const user = await User.findById(req.user._id);
    const chatsIds = user.chats;

    const allChats = await Chat.find({});

    allChats.forEach(chat => {
      if (chatsIds.includes(chat._id)) {
        chats.push(chat);
      }
    });

    return res.send(chats);
  }
  else if (req.body.id) {
    const user = await User.findById(req.user._id);

    return res.send(user);
  }
});

module.exports = router;