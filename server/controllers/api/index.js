const router = require('express').Router();

const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');


router.use('/employees', employeeRoutes);


module.exports = router;