const express = require("express");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const { User, validate } = require("../models/User.model");

const router = express.Router();


router.put('/', async (req, res) => {
  if (!req.body) res.sendStatus(400);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ name: req.body.name });

  if (!user) return res.status(401).send("User wasn't registered.");
  if (user.isOnline) return res.status(401).send("User already log in.");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (!result) res.sendStatus(401).send('Incorrect password');
  });
  user.isOnline = true;
  await user.save();

  const token = user.generateAuthToken();

  res.cookie('x-dark-token', token, { maxAge: 28800000, httpOnly: false, domain: '' });

  res.send({
    _id: user._id,
    name: user.name,
    isOnline: user.isOnline,
    'x-dark-token': token
  });
});

router.delete('/', auth, async (req, res) => {
  const isLogouted = await User.logoutById(req.user._id);

  res.sendStatus(isLogouted);
});

module.exports = router;