const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsControllers = require('../Controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, timestamp + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else {
        cb(null, false)
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', productsControllers.producs_get_all);
router.post('/', checkAuth, upload.single('productImage'), productsControllers.products_creat_product);

router.get('/:productID', productsControllers.products_get_product);
router.patch('/:productID', checkAuth, productsControllers.products_update_product)
router.delete('/:productID', checkAuth, productsControllers.products_delet_product);

module.exports = router;