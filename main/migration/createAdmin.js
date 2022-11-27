require('../connections/mongodb');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

(async () => {
  try {
    const email = 'kiet.le.admin@gmail.com';
    const password = 'admin';
    const newAdmin = {
      email,
      password: bcrypt.hashSync(password, 10),
      persona: 'admin',
      firstName: 'kiet',
      lastNameL: 'le',
      preferredLanguage: 'en-US',
      createdBy: 'system',
      creationDate: new Date(),
    };
    await User.create(newAdmin);
  } catch (err) {
    console.log(`Error creating admin: ${err.message}, Stack: ${err.stack}`);
  } finally {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  }
})();
