const bcrypt = require("bcrypt");
const express = require("express");
const Chat = require('../models/Chat.model');

const auth = require("../middleware/auth");
const { User, validate } = require("../models/User.model");
const { CHAT_TYPE } = require('../const/const');

const router = express.Router();


router.get("/", auth, async (req, res) => {
  const allUsers = await User.find().select("-password");

  const users = allUsers.filter(user => user._id.toString() !== req.user._id);

  res.send(users);
});

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/create", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ name: req.body.name });
  if (user) return res.status(400).send("User already registered.");

  const userRes = await User.collection.insertOne({
    name: req.body.name,
    password: await bcrypt.hash(req.body.password, 10),
    isOnline: false,
    ava: "",
  });

  const chatRes = await Chat.collection.insertOne({
    participants: [userRes.ops[0]._id],
    chatName: 'Saved messages',
    chatType: CHAT_TYPE.saved,
    ava: "",
    unreadCount: 0,
    lastInteraction: "",
  });

  await User.findOneAndUpdate({ _id: userRes.ops[0]._id }, { chats: [chatRes.ops[0]._id] });

  res.sendStatus(200);
});

module.exports = router;