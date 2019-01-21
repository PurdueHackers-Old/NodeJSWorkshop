const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/', async (req, res) => {
	const books = await Book.findAll();
	res.send(books);
});

router.post('/', async (req, res) => {
	const { title, author } = req.body;
	if (!title) return res.status(400).send('Please provide a title');
	if (!author) return res.status(400).send('Please provide a author');

	const newBook = await Book.create({ title, author });
	res.send(newBook);
});

module.exports = router;
