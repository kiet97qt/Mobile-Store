require('../connections/mongodb');
const mongoose = require('mongoose');
const adminModel = require("../models/core/admin");
const bcrypt = require("bcrypt");

(async () => {
    try {
        const email = 'admin@gmail.com';
        const password = 'admin';
        const newAdmin = {
            email,
            password: bcrypt.hashSync(password, 10),
        };
        await adminModel.create(newAdmin);
    } catch (err) {
        console.log(`Error creating admin: ${err.message}, Stack: ${err.stack}`);
    } finally {
        mongoose.connection.close(function(){
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }
})();