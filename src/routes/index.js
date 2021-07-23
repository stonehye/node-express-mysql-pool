const express = require('express');
const router = express.Router();

// const menusRouter = require('./menus');
// const ordersRouter = require('./orders');
// const paymentsRouter = require('./payments');

// router.use('/menus', menusRouter);
// router.use('/orders', ordersRouter);
// router.use('/payments', paymentsRouter);

router.get('/', (req, res) => {
    res.send('hello world!');
});

module.exports = router;
