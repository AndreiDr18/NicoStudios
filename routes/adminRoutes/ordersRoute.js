const express = require('express');
const router = express.Router();

const controller = require('../../controllers/adminControllers/ordersController');

router.get('/',controller.ordersGET);
router.get('/view/:id', controller.ordersVIEW);

router.use(express.static('../../public'));
module.exports = router;
