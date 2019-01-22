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

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
	if (!book) return res.status(404).send(`Book with ID: ${id} does not exist!`);

	res.send(book);
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, author } = req.body;

	const book = await Book.findById(id);
	if (!book) return res.status(400).send(`Book with ID: ${id} does not exist!`);

	if (title) book.title = title;
	if (author) book.author = author;
	await book.save();

	res.send(book);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
	if (!book) return res.status(404).send(`Book with ID: ${id} does not exist!`);

	const removedBook = await book.destroy();
	res.send(removedBook);
});

module.exports = router;
