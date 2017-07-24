const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/authorize', authController.authorize);
router.get('/token', authController.token);
router.get('/token/revoke', authController.revoke);

module.exports = router;