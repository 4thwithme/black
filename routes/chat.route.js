const express = require("express");

const auth = require("../middleware/auth");
const Chat = require('../models/Chat.model');
const { User } = require('../models/User.model');

const router = express.Router();


router.get('/', auth, async (req, res) => {
  const chats = [];

  if (!Object.values(req.body).length) {
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