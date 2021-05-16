const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img/orderReferences');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.name}` + '.jpg');
    }
});
let upload = multer({
    storage: storage
});

router.get('/', controller.orderGET);
router.post('/', upload.single('orderReference'), controller.orderPOST);

module.exports = router;
