require('dotenv').config();

const env = process.env;

const config = {
	PORT: env.PORT || 5000,
	SECRET: env.SECRET || 'my-secret',
	EXPIRES_IN: env.EXPIRES_IN || '7 days',
	NODE_ENV: env.NODE_ENV || 'development'
};

module.exports = config;
