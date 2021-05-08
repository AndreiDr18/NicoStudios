const express = require('express');
const router = express.Router();

//Routes
const ordersRouter = require('./ordersRoute');

//Controller
const controller = require('../../controllers/adminControllers/indexController');

//controller middleware
router.get('/', controller.indexGET);
router.post('/', controller.indexPOST);

//Routing

router.use('/orders', ordersRouter);

module.exports = router;