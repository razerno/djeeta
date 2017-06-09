const express = require('express');
const router = express.Router();

const player_controller = require('../controllers/player');

router.get('/', player_controller.index);
router.get('/playlist/:id', player_controller.playlist);

module.exports = router;