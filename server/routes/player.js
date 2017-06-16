const express = require('express');
const router = express.Router();

const playerController = require('../controllers/player');

router.get('/', playerController.index);
router.get('/playlist/:id', playerController.playlist);
router.post('/playlist/:id', playerController.addSong);

module.exports = router;