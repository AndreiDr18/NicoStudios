const express = require('express');
const router = express.Router();

const controller = require('../../controllers/adminControllers/contactsController');

router.get('/',controller.contactsGET);
router.get('/view/:id', controller.contactsVIEW);
router.get('/delete/:id', controller.contactsDELETE);

module.exports = router;
