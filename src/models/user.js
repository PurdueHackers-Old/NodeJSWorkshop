const bcrypt = require('bcrypt');
const sequelize = require('./sequelize');

const hashPassword = async user => {
	try {
		if (user.changed('password')) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
		}
	} catch (error) {
		console.error('Error hashing user password');
		throw error;
	}
};

const User = sequelize.define(
	'User',
	{
		username: sequelize.Sequelize.STRING,
		password: sequelize.Sequelize.STRING
	},
	{
		hooks: {
			beforeSave: hashPassword
		},
		defaultScope: {
			attributes: { exclude: ['password'] }
		},
		scopes: {
			withPassword: {
				attributes: {}
			}
		}
	}
);

module.exports = User;
