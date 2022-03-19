const router = require('express').Router();

const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');
const locationRoutes = require('./locationRoutes');
const accountRoutes = require('./locationRoutes');


router.use('/employees', employeeRoutes);
router.use('/customers', customerRoutes);
router.use('/locations', locationRoutes);
router.use('/account', accountRoutes);


module.exports = router;