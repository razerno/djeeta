const express = require('express');
const router = express.Router();

const playerController = require('../controllers/player');

router.get('/', playerController.index);
router.get('/playlist/:id', playerController.getPlaylist);
router.get('/playlist/:id/nowplaying', playerController.getNowPlaying);
router.get('/playlist/:id/items', playerController.getQueue);
router.post('/playlist/:id/items', playerController.addSong);
router.post('/playlist/:id/items/:songid/move', playerController.moveSong);
router.delete('/playlist/:id/items/:songid', playerController.deleteSong);

module.exports = router;