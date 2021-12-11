const express = require('express');
const router = express.Router();

//Routes
const ordersRouter = require('./ordersRoute');
const contactsRouter = require('./contactsRoute');
const uploadRouter = require('./uploadRoute');
const portfolioRouter = require('./portfolioRoute');
const blogRouter = require('./blogRoute');

//Controller
const controller = require('../../controllers/adminControllers/indexController');

//controller middleware
router.get('/',require( '../../utility/adminAuth'), controller.indexGET);
router.post('/', controller.indexPOST);

//Routing

router.use('/orders',require('../../utility/adminAuth'), ordersRouter);
router.use('/contacts',require('../../utility/adminAuth'), contactsRouter);
router.use('/upload',require( '../../utility/adminAuth'), uploadRouter);
router.use('/portfolio',require( '../../utility/adminAuth'), portfolioRouter);
router.use('/blog',require( '../../utility/adminAuth'), blogRouter);

module.exports = router;
