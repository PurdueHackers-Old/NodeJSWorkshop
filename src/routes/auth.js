const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET, EXPIRES_IN } = require('../config');
const { success, failure } = require('../utils');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	if (!username) return failure(res, 400, 'Please provide a username');
	if (!password) return failure(res, 400, 'Please provide a password');

	let user = await User.findOne({ where: { username } });
	if (user) return failure(res, 401, `User with the username: ${username} already exists`);

	user = await User.create({ username, password });
	const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRES_IN });
	return success(res, {
		user,
		token
	});
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username) return failure(res, 400, 'Please provide a username');
	if (!password) return failure(res, 400, 'Please provide a password');

	let user = await User.scope('withPassword').findOne({ where: { username } });
	if (!user) return failure(res, 401, `User with the username: ${username} does not exist`);

	if (!user.comparePassword(password)) return failure(res, 401, `Incorrect password`);

	const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRES_IN });
	return success(res, {
		user,
		token
	});
});

module.exports = router;
