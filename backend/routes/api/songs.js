const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');
const { User } = require('../../db/models');
const { Comment } = require('../../db/models');

const router = express.Router();


const validateUploadSong = [
  check('url')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a url for your song."),
  check('url')
    .isURL()
    .withMessage("Please provide a valid URL."),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title."),
  check('title')
    .isLength({ max: 150 })
    .withMessage("Song titles must be under 150 characters."),
  handleValidationErrors
];

const validateEditSong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please provide your new title."),
  check('title')
    .isLength({ max: 150 })
    .withMessage("Song titles must be under 150 characters."),
  handleValidationErrors
];


// Get all songs (READ):
router.get('/', asyncHandler(async (req, res) => {

  const songs = await Song.findAll({
    include: { model: User }
  })

  return res.json(songs);
}));


// Get a single song song (READ):
router.get('/:songId', asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const song = await Song.findByPk(songId, {
    include: { model: User, Comment }
  });

  return res.json(song);
}));


// Upload a song: (CREATE):
router.post('/', validateUploadSong, asyncHandler(async (req, res) => {

  const { userId, url, title } = req.body;

  const song = await Song.create({
    userId, url, title
  });

  return res.redirect(`${req.baseUrl}/${song.id}`);
}));


// Edit a song (UPDATE):
router.put('/:songId', validateEditSong, asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const editSong = await Song.findByPk(songId);

  const { title } = req.body;

  await editSong.update({
    title
  });

  const song = await Song.findByPk(songId, {
    include: { model: User }
  });

  return res.json(song);
}));


// Remove a song (DELETE):
router.delete('/:songId', asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const song = await Song.findByPk(songId);

  await song.destroy();

  return res.json({ "message": "song deleted. beep boop." });
}));


module.exports = router;
