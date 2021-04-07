const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

router.get('/', controller.contactGET);

module.exports = router;