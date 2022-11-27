const MongoUtil = require('../mongoUtil');
const Logger = require('../logger');
const logger = new Logger('mongoSDMUtil');
const config = require('../../config')();

const mongoUtil = new MongoUtil();
(async () => {
  logger.info(config.database.connectionString);
  await mongoUtil.init(config.database.connectionString);
  logger.info('INFO: (), Message: Initiated mongoUtil for Sdm db');
})();
module.exports = mongoUtil;
