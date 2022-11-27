function getConfig() {
  let config;
  switch (process.env.NODE_ENV) {
    case 'local':
      config = require('./local.json');
      break;

    case 'production':
      config = require('./production.json');
      break;

    default:
      config = require('./local.json');
      break;
  }
  return config;
}

module.exports = getConfig;
