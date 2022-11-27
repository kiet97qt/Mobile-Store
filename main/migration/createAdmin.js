require('../connections/mongodb');
const mongoose = require('mongoose');
const { User } = require('../models/User');
const Logger = require('../utils/logger');
const logger = new Logger('createAdmin');
const bcrypt = require('bcrypt');

(async () => {
  try {
    const email = 'kiet.le.admin@gmail.com';
    const password = 'admin';
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('User has already existed');
    }
    const newAdmin = {
      email,
      password: bcrypt.hashSync(password, 10),
      persona: 'admin',
      firstName: 'kiet',
      lastName: 'le',
      preferredLanguage: 'en-US',
      createdBy: 'system',
      creationDate: new Date(),
    };
    await User.create(newAdmin);
  } catch (err) {
    logger.error(`Error creating admin: ${err.message}, Stack: ${err.stack}`);
  } finally {
    mongoose.connection.close(function () {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  }
})();
