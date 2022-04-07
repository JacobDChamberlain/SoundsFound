const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const songsRouter = require('./songs');
const commentsRouter = require('./comments');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter);



module.exports = router;
