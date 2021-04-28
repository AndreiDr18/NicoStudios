const express = require('express');
const router = express.Router();

//Controller
const controller = require('../../controllers/adminControllers/indexController');

//controller middleware
router.get('/', controller.indexGET);
router.post('/', controller.indexPOST);

module.exports = router;