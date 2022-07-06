const express = require('express');
const { createProduct } = require('../controllers/product');
const { requireSignin, adminMiddleware } = require('../middleware');
const multer = require('multer');
const shortid = require('shortid');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
//router.get('/category/getcategories', getCategories);


module.exports = router;