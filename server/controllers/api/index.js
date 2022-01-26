const router = require('express').Router();

const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');
const locationRoutes = require('./locationRoutes');


router.use('/employees', employeeRoutes);
router.use('/locations', locationRoutes);


module.exports = router;