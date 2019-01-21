const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/', async (req, res) => {
	const books = await Book.findAll();
	res.send(books);
});

module.exports = router;
