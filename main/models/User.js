const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  userRole: { type: String },
  persona: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  preferredLanguage: {
    type: String,
    default: 'en-US',
  },
  lastLogin: {
    type: Date,
    default: null,
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

const User = mongoose.model('users', userSchema);
module.exports = { User };
