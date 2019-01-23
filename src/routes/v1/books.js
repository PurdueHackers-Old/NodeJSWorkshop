const express = require('express');
const { success, failure } = require('../../utils');
const Book = require('../../models/book');
const router = express.Router();

router.get('/', async (req, res) => {
	const books = await Book.findAll();
	return success(res, books);
});

router.post('/', async (req, res) => {
	const { title, author } = req.body;
	if (!title) return failure(res, 400, 'Please provide a title');
	if (!author) return failure(res, 400, 'Please provide a author');

	const newBook = await Book.create({ title, author });
	return success(res, newBook);
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
	if (!book) return failure(res, 404, `Book with ID: ${id} does not exist!`);

	return success(res, book);
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { title, author } = req.body;

	const book = await Book.findById(id);
	if (!book) return failure(res, 404, `Book with ID: ${id} does not exist!`);

	if (title) book.title = title;
	if (author) book.author = author;
	await book.save();

	return success(res, book);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
	if (!book) return failure(res, 404, `Book with ID: ${id} does not exist!`);

	const removedBook = await book.destroy();
	return success(res, removedBook);
});

module.exports = router;
