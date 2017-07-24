const express = require('express');
const router = express.Router();

const botController = require('../controllers/bot');

router.get('/commands', botController.commands);
router.get('/prefix', botController.prefix);
router.get('/avatar', botController.avatar);

module.exports = router;