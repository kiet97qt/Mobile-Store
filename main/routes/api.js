const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const loginController = require('../controllers/loginController');

router.get('/search', ProductController.search);
router.post('/login', loginController.loginUser);

module.exports = router;
