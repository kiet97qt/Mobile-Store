const express = require('express');
require('dotenv');
const bodyParser = require('body-parser');
require('./connections/mongodb');
const app = express();
const routes = require('./routes');
const loginServices = require('./services/loginService');
const Logger = require('./utils/logger');
const logger = new Logger('app');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
//swagger
var swaggerUi = require('swagger-ui-express');
var fs = require('fs');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDocument = jsyaml.safeLoad(spec);

async function authenticateAndAuthorizeUser(req, res, next) {
  try {
    const decoded = await loginServices.decodeToken(req, res);
    next();
  } catch (err) {
    logger.error(`authenticateAndAuthorizeUser(): error ${err}`);
  }
}
app.use(authenticateAndAuthorizeUser);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  logger.info(`Example app listening at http://localhost:${PORT}`);
});
