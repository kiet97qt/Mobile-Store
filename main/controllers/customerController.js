const OrderedUUID = require('ordered-uuid');
const bcrypt = require('bcrypt');
const MidCustomer = require('../middlewares/customerMiddleware');
const customerService = require('../services/customerService');
const responseMessageConfig = require('../config/responseMessageConfig');
const Logger = require('../utils/logger');
const logger = new Logger('customerController');
//new
exports.registerCustomer = async (req, res) => {
  try {
    logger.info('registerCustomer()');
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const userDTO = {
      _id: OrderedUUID.generate(),
      ...req.body,
      persona: 'customer',
      lastLogin: null,
      creationBy: req.body.email,
      creationDate: new Date(),
      updatedBy: null,
      updatedDate: null,
    };
    if (!req.body.preferredLanguage) {
      req.body.preferredLanguage = 'en-US';
    }
    await customerService.createCustomer(userDTO);
    return res.status(200).send(responseMessageConfig.S201_CREATECUSSUC);
  } catch (error) {
    return res.status(500).send(`registerCustomer(): ${error}`);
  }
};
//---

exports.getProfile = (req, res) => {
  MidCustomer.getProfile(req.user_id)
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err }));
};

exports.changeForgotPassword = (req, res) => {
  MidCustomer.changeForgotPassword(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.createOrder = (req, res) => {
  MidCustomer.createOrder(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.getOrder = (req, res) => {
  MidCustomer.getOrder(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.addProducts = (req, res) => {
  MidCustomer.addProducts(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.updateBasket = (req, res) => {
  MidCustomer.updateBasket(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.orderComfirmedByCustomer = (req, res) => {
  MidCustomer.orderComfirmedByCustomer(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.deleteProducts = (req, res) => {
  MidCustomer.deleteProducts(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

// module.exports = {
//   getProfile,
//   changeForgotPassword,
//   createOrder,
//   getOrder,
//   addProducts,
//   updateBasket,
//   orderComfirmedByCustomer,
//   deleteProducts,
// };
