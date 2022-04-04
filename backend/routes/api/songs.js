const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');

const router = express.Router();


const validateUploadSong = [
  // TODO - validate song upload form fields
  , handleValidationErrors
];


// Get all songs (READ):
router.get('/', asyncHandler(async (req, res) => {

  const songs = await Song.findAll()

  return res.json(songs);
}));


// Get a single song song (READ):
router.get('/:songId', asyncHandler(async (req, res) => {

  const songId = req.params.songId;

  const song = await Song.findByPk(songId);

  return res.json(song);
}));


// Upload a song: (CREATE):
// router.post('/', validateUploadSong, asyncHandler(async (req, res) => {

//   const { userId, url, title } = req.body;

//   const song = await Song.create({
//     userId, url, title
//   });

//   return res.json({ song });
// }));


// Edit a song (UPDATE):
// router.put('/', validateUploadSong, asyncHandler(async (req, res) => {

//   const { userId, url, title } = req.body;

//   const song = await Song.create({
//     userId, url, title
//   });

//   return res.json({ song });
// }));


// Remove a song (DELETE):
router.delete('/:songId', asyncHandler(async (req, res) => {

  const { songId } = req.params.songId;

  const song = await Song.findByPk(songId);

  await song.delete();

  return res.json({ "message": "song deleted. beep boop." }); // TODO - redirect user to home page
}));


module.exports = router;
