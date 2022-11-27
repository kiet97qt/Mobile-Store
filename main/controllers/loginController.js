const loginService = require('../services/loginService');

const Logger = require('../utils/logger');
const logger = new Logger('loginController');

exports.loginUser = async (req, res) => {
  try {
    const loginResult = await loginService.loginUser(req.body);
    if (loginResult.status > 200) {
      return res.status(loginResult.status).send(loginResult.message);
    }
    return res.status(200).send(loginResult.data);
  } catch (error) {
    logger.error(`Error loginUser() message: ${error.message}, stack: ${error.stack}`);
  }
};
