const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const customerController = require('../controllers/customerController');
const AdminController = require('../controllers/AdminController');

const MidProduct = require('../middlewares/ProductMiddleware');
const customerMiddleware = require('../middlewares/customerMiddleware');

const { isCustomerAuth } = require('../utils/authen');
const { checkAuthen, testCode } = require('../utils/hash');

// new
router.post('/register', customerMiddleware.registerUserValidation, customerController.registerCustomer);

//

router.post('/login', AuthController.login);

//router.post('/register', AuthController.register);

router.get('/profile', isCustomerAuth, customerController.getProfile);

router.post('/forgotPassword', AdminController.sendMailForgotPassword);

router.patch('/changeForgotPassword', customerController.changeForgotPassword);

router.post('/order', isCustomerAuth, customerController.createOrder);

router.get('/order', isCustomerAuth, customerController.getOrder);

router.post('/order/products', isCustomerAuth, MidProduct.checkProductExist, customerController.addProducts);

router.put('/order', isCustomerAuth, customerController.updateBasket);

router.patch('/order', isCustomerAuth, customerController.orderComfirmedByCustomer);

router.delete('/order/products', isCustomerAuth, customerController.deleteProducts);

router.post('/testCode', testCode);

module.exports = router;
