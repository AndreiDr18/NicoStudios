const express = require('express');
const router = express.Router();

//Routes
const ordersRouter = require('./ordersRoute');
const contactsRouter = require('./contactsRoute');
const uploadRouter = require('./uploadRoute');

//Controller
const controller = require('../../controllers/adminControllers/indexController');

//controller middleware
router.get('/', controller.indexGET);
router.post('/', controller.indexPOST);

//Routing

router.use('/orders', ordersRouter);
router.use('/contacts', contactsRouter);
router.use('/upload', uploadRouter);

module.exports = router;
