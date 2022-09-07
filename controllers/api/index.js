const router = require('express').Router();

const articleRoutes = require('./articleRoute');
const userRoutes = require('./userRoutes');

router.use('/team', articleRoutes);
router.use('/profile', userRoutes);

module.exports = router;
