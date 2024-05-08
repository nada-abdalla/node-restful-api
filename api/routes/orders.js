const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const OrdersControllers = require('../Controllers/orders')

router.get('/', checkAuth, OrdersControllers.orders_get_all);

router.post('/', checkAuth, OrdersControllers.orders_creat_order);

router.get('/:orderId', checkAuth, OrdersControllers.orders_get_order);
router.delete('/:orderId', checkAuth, OrdersControllers.orders_delet_order);

module.exports = router;