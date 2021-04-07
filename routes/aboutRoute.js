const express = require('express');
const router = express.Router();

const controller = require('../controllers/aboutController');
router.get('/', controller.aboutGET);

module.exports = router;