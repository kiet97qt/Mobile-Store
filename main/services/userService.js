const mongoUtil = require('../utils/db/mongoSdmUtil');
const collections = require('../constants/collections');
const Logger = require('../utils/logger');
const { query } = require('express');
const logger = new Logger('userService');

const getUser = async (query) => {
  logger.info(`getUser with query: ${JSON.stringify(query)}`);
  return await mongoUtil.findOne(collections.users, query);
};

const updateUserInfo = (query, updatedInfo) => {
  mongoUtil.updateOne(collections.users, query, {
    $set: updatedInfo,
  });
};

module.exports = {
  getUser,
  updateUserInfo,
};
