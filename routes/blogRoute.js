const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.get('/', controller.blogGET);
router.get('/:id', controller.blogVIEW);

module.exports = router;
