const express = require('express');
const books = require('./books');
const auth = require('./auth');
const router = express.Router();

router.use('/api/books', books);
router.use('/api/auth', auth);

module.exports = router;
