const { Router } = require('express');
const usersRouter = require('./usersRouter');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;
