const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const songsRouter = require('./songs');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);



module.exports = router;
