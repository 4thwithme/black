const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//simple schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  //give different access rights if admin or not 
  isAdmin: Boolean,
  chats: Array
});

UserSchema.methods.generateAuthToken = function () {
  //get the private key from the config file -> environment variable
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
  return token;
};

UserSchema.statics.logoutById = async function(userId) {
  if (userId) {
    const user = await this.findById(userId);

    if (user.isOnline) {  
      user.isOnline = false;
      await user.save();
      
      console.log('user ' + userId + ' was disconnected');
      return 200;
    }
  }

  return 400;
};

const User = mongoose.model('User', UserSchema);

//function to validate user 
const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate: validateUser,
};