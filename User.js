const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: String,
  provider: {
    type: String,
    enum: ['google', 'facebook', 'github']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

