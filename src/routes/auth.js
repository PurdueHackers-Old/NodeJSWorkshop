const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET, EXPIRES_IN } = require('../config');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	if (!username) return res.status(400).send('Please provide a username');
	if (!password) return res.status(400).send('Please provide a password');

	let user = await User.findOne({ where: { username } });
	if (user) return res.status(401).send(`User with the username: ${username} already exists`);

	user = await User.create({ username, password });
	const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: EXPIRES_IN });
	res.send({
		user,
		token
	});
});

module.exports = router;
