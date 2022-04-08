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

// const validateEditSong = [
//   check('title')
//     .exists({ checkFalsy: true })
//     .withMessage("Please provide your new title."),
//   check('title')
//     .isLength({ max: 150 })
//     .withMessage("Song titles must be under 150 characters."),
//   handleValidationErrors
// ];


// Get all comments for a song (READ):
router.get('/:songId', asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const comments = await Comment.findAll({
    where: { songId },
    include: { model: User, Song }
  })

  return res.json(comments);
}));


// // Get a single song song (READ):
// router.get('/:songId', asyncHandler(async (req, res) => {

//   const songId = req.params.songId;

//   const song = await Song.findByPk(songId, {
//     include: { model: User, Comment }
//   });

//   return res.json(song);
// }));


// Post a comment: (CREATE):
router.post('/:songId', validateUploadComment, asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const { userId, body } = req.body;

  const comment = await Comment.create({
    userId, songId, body
  });

  return res.json(comment);
}));


// // Edit a song (UPDATE):
// router.put('/:songId', validateEditSong, asyncHandler(async (req, res) => {

//   const songId = req.params.songId;

//   const editSong = await Song.findByPk(songId);

//   const { title } = req.body;

//   await editSong.update({
//     title
//   });

//   const song = await Song.findByPk(songId, {
//     include: { model: User }
//   });

//   return res.json(song);
// }));


// // Remove a song (DELETE):
// router.delete('/:songId', asyncHandler(async (req, res) => {

//   const songId = req.params.songId;

//   const song = await Song.findByPk(songId);

//   await song.destroy();

//   return res.json({ "message": "song deleted. beep boop." });
// }));


module.exports = router;
