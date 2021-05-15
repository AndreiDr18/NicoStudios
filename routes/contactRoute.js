const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

router.get('/', controller.contactGET);
router.post('/', controller.contactPOST);


module.exports = router;
