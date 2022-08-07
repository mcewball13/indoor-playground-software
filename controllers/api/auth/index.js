const router = require('express').Router();

const authRoutes = require('./customerAuthRoutes');

router.use('/customers', authRoutes);


module.exports = router;