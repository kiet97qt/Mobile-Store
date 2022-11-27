const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/search', ProductController.search);
router.post('/login', ProductController.search);

module.exports = router;
