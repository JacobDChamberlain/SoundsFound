const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

const validateUploadSong = [

];

// Get all songs (READ):

// Upload a song: (CREATE): -- i have no idea if this works i'm just throwing spaghetti its 4:11am kbai
router.post('/', validateUploadSong, asyncHandler(async (req, res) => {
  const { userId, url, title } = req.body;
  const song = await Song.create({
    userId, url, title
  });

  return res.json({ song });
}));

// Edit a song (UPDATE):

// Remove a song (DELETE):
