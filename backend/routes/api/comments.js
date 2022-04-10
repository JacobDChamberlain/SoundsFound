const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');
const { User } = require('../../db/models');
const { Comment } = require('../../db/models');

const router = express.Router();


const validateUploadComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a comment."),
  check('body')
    .isLength({ max: 200 })
    .withMessage("Comments must be under 200 characters."),
  handleValidationErrors
];


// Get all comments for a song (READ):
router.get('/:songId', asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const comments = await Comment.findAll({
    where: { songId },
    include: { model: User, Song }
  })

  return res.json(comments);
}));


// Post a comment: (CREATE):
router.post('/:songId', validateUploadComment, asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const { userId, body } = req.body;

  const comment = await Comment.create({
    userId, songId, body
  });

  const newComment = await Comment.findByPk(comment.id, {
    include: User
  })

  return res.json(newComment);
}));


// Remove a comment (DELETE):
router.delete('/:commentId/', asyncHandler(async (req, res) => {

  const commentId = req.params.commentId;

  const comment = await Comment.findByPk(commentId);

  await comment.destroy();

  return res.json({ "message": "comment deleted. beep boop." });
}));


module.exports = router;
