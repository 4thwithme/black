const bcrypt = require("bcrypt");
const express = require("express");
const fs = require("fs");
const Chat = require("../models/Chat.model");
const cloudinary = require("cloudinary").v2;

const auth = require("../middleware/auth");
const { User, validate } = require("../models/User.model");
const { CHAT_TYPE } = require("../const/const");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const allUsers = await User.find().select("-password");

  const users = allUsers.filter((user) => user._id.toString() !== req.user._id);

  res.send(users);
});

router.get("/search", auth, async (req, res) => {
  if (req.query.q && req.query.q.length) {
    const usersByQuery = await User.searchUsers(req.query.q, req.query.limit, req.query.offset);

    const users = usersByQuery.filter((user) => user._id.toString() !== req.user._id);

    return res.send(users);
  } else {
    res.send([]);
  }
});

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.put("/create", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ name: req.body.name });
  if (user) return res.status(400).send("User already registered.");

  const userData = {
    name: req.body.name,
    pass: await bcrypt.hash(req.body.pass, 10),
    ava: req.body.ava,
    isOnline: false,
    isAdmin: false,
    chats: []
  };

  if (req.body.ava.length) {
    const base64Data = req.body.ava.replace(/^data:image\/jpeg;base64,/, "");

    fs.writeFile(__dirname + "/../localStorage/ava.jpg", base64Data, "base64", (err) => {
      if (err) console.error(err);

      cloudinary.uploader.upload(
        __dirname + "/../localStorage/ava.jpg",
        { tags: "ava_" + req.body.name },
        async (err, image) => {
          if (err) console.warn(err);

          fs.unlink(__dirname + "/../localStorage/ava.jpg", () => {
            User.create({ ...userData, ava: image.url }, (err, user) => {
              if (err) console.error(err);

              Chat.create(
                {
                  participants: [user._id],
                  chatName: "Saved messages",
                  chatType: CHAT_TYPE.saved,
                  ava: "",
                  unreadCount: 0,
                  lastInteraction: "",
                  date: Date.now()
                },
                async (err, chat) => {
                  if (err) console.error(err);

                  await User.findOneAndUpdate({ _id: user._id }, { chats: [chat._id] });
                }
              );
            });
          });
        }
      );
    });
  } else {
    User.create(userData, (err, user) => {
      if (err) console.error(err);

      Chat.create(
        {
          participants: [user._id],
          chatName: "Saved messages",
          chatType: CHAT_TYPE.saved,
          ava: "",
          unreadCount: 0,
          lastInteraction: "",
          date: Date.now()
        },
        async (err, chat) => {
          if (err) console.error(err);

          await User.findOneAndUpdate({ _id: user._id }, { chats: [chat._id] });
        }
      );
    });
  }
  res.sendStatus(200);
});

module.exports = router;
