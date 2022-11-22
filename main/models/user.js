const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  preferredLanguage: {
    type: String,
    default: 'en-US',
  },
  createdBy: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  updatedBy: {
    type: String,
    default: null,
  },
  updatedDate: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
