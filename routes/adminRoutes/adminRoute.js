const express = require('express');
const router = express.Router();

//Routes
const ordersRouter = require('./ordersRoute');
const contactsRouter = require('./contactsRoute');

//Controller
const controller = require('../../controllers/adminControllers/indexController');

//controller middleware
router.get('/', controller.indexGET);
router.post('/', controller.indexPOST);

//Routing

router.use('/orders', ordersRouter);
router.use('/contacts', contactsRouter);

module.exports = router;
