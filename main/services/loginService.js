const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Logger = require('../utils/logger');
const logger = new Logger('loginService');
const { SECRET_KEY, EXPIRES_IN } = require('../constants');
const { encodeToken } = require('../utils/hash');
const userService = require('./userService');
const mongoUtil = require('../utils/db/mongoSdmUtil');
const responseMessageConfig = require('../config/responseMessageConfig');

const verifyToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY);
};

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

const isValidPassword = function (loginPassword, userPassword) {
  return bcrypt.compareSync(loginPassword, userPassword);
};

const loginUser = async (loginInfo) => {
  const { email: loginEmail, password: loginPassword } = loginInfo;
  const user = await userService.getUser({
    email: loginEmail,
  });

  if (!user) {
    logger.error(`Not found user with email: ${loginEmail}`);
    return {
      status: 400,
      message: responseMessageConfig.E400_NOTFOUNDUSER,
    };
  }

  const isValid = isValidPassword(loginPassword, user.password);
  if (!isValid) {
    logger.error(`Not found user with email: ${loginEmail}`);
    return {
      status: 401,
      message: responseMessageConfig.E401_INVALIDPASSWORD,
    };
  }

  user.lastLogin = new Date();

  const jwtData = {
    _id: user._id,
    email: user.email,
    persona: user.persona,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const result = {
    token: encodeToken(jwtData),
    _id: user._id,
    email: user.email,
    persona: user.persona,
    firstName: user.firstName,
    lastName: user.lastName,
    preferredLanguage: user.preferredLanguage,
    lastLogin: user.lastLogin,
  };

  const updateQuery = {
    _id: user._id,
  };

  const updatedInfo = {
    lastLogin: user.lastLogin,
  };
  userService.updateUserInfo(updateQuery, updatedInfo);

  return {
    status: 200,
    message: responseMessageConfig.S200_LOGINSUCCESS,
    data: result,
  };
};

module.exports = {
  decodeToken,
  isValidPassword,
  loginUser,
};
