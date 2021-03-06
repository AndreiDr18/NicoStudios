const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.get('/', controller.blogGET);
router.get('/:name', controller.blogVIEW);

module.exports = router;
