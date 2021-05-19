const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolioController');

router.get('/', controller.indexGET);

module.exports = router;
