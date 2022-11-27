const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const bodyParser = require('body-parser');
require('./connections/mongodb');
const app = express();
const routes = require('./routes');
const loginServices = require('./services/loginService');
const Logger = require('./utils/logger');
const logger = new Logger('app');
const OrderedUUID = require('ordered-uuid');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
//swagger
var swaggerUi = require('swagger-ui-express');
var fs = require('fs');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDocument = jsyaml.safeLoad(spec);
const responseMessageConfig = require('./config/responseMessageConfig');
const config = require('./config')();

async function authenticateAndAuthorizeUser(req, res, next) {
  try {
    const decoded = await loginServices.decodeToken(req, res);
    const isAuthorised = true;
    //const isAuthorised = loginapi.authorizeUser(req.method + ':' + req.url.toLowerCase(), decoded.persona);
    if (isAuthorised) {
      req.config = config;
      res.locals.decoded = decoded;
      res.locals.decoded.requestID = OrderedUUID.generate();
      next();
    } else {
      return res.status(401).send(responseMessageConfig.E401_SADR013);
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).send(responseMessageConfig.E401_SADR011);
    } else {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }
}
app.use(authenticateAndAuthorizeUser);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  logger.info(`Example app listening at http://localhost:${PORT}`);
});

// const mongoUtil = require('./utils/db/mongoSdmUtil');
// console.log(`mongoUtil ${JSON.stringify(mongoUtil)}`);

// const test = async () => {
//   const admins = await mongoUtil.find('admins', {});
//   console.log(`admins: ${JSON.stringify(admins)}`);
// };

// setTimeout(test, 3000);
