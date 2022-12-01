const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Logger = require('../utils/logger');
const logger = new Logger('customerService');
const { SECRET_KEY, EXPIRES_IN } = require('../constants');
const { encodeToken } = require('../utils/hash');
const userService = require('./userService');
const mongoUtil = require('../utils/db/mongoSdmUtil');
const responseMessageConfig = require('../config/responseMessageConfig');

const decodeToken = async function (req, res) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token || token === 'undefined' || typeof token == 'undefined') {
    return {
      persona: 'any',
    };
  }
  try {
    return await verifyToken(token);
  } catch (err) {
    err.token = token;
    throw err;
  }
};

const createCustomer = async function (userDTO) {
  try {
    const result = await userService.createUser(userDTO);
    logger.info(`createCustomer(): ${JSON.stringify(result)}`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  decodeToken,
  createCustomer,
};
