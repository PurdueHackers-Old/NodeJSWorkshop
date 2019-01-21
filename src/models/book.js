const sequelize = require('./sequelize');

const Book = sequelize.define(
	'Book',
	{
		title: sequelize.Sequelize.STRING,
		author: sequelize.Sequelize.STRING
	},
	{}
);

module.exports = Book;
