const controller = require('../../controllers/adminControllers/blogController');

const express = require('express');
const router = express.Router();

const multer = require('multer');

const path = require('path');

let blogStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.normalize(__dirname + '/../../public/img/blog'));
    },
    filename: (req, file, callback) => {
        callback(null, `${req.body.title}` + '.jpg');
    }
});
let blogUpload = multer({
    storage: blogStorage
});


router.get('/delete/:id', controller.blogDELETE);
router.post('/edit/:id', blogUpload.single('drawing'), controller.blogEDIT);
router.get('/', controller.blogGET);

module.exports = router;
