const controller = require('../../controllers/adminControllers/portfolioController.js');

const express = require('express');
const router = express.Router();

router.get('/delete/:id', controller.indexDELETE);
router.get('/', controller.indexGET);

module.exports = router;
