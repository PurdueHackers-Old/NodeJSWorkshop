'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
			Add altering commands here.
			Return a promise to correctly handle asynchronicity.

			Example:
			return queryInterface.bulkInsert('People', [{
				name: 'John Doe',
				isBetaMember: false
			}], {});
		*/

		return queryInterface.bulkInsert(
			'Books',
			[
				{
					title: 'Harry Potter',
					author: 'JK Rowling',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Game of Thrones',
					author: 'George R.R. Martin',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Othello',
					author: 'Shakespeare',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
			Add reverting commands here.
			Return a promise to correctly handle asynchronicity.

			Example:
			return queryInterface.bulkDelete('People', null, {});
		*/
		return queryInterface.bulkDelete('Books', null, {});
	}
};
