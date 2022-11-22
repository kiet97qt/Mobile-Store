const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../constants');

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

module.exports = {
  decodeToken,
};
