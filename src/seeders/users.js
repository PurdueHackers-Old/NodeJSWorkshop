'use strict';
const bcrypt = require('bcrypt');

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
			'Users',
			[
				{
					username: 'Ross Geller',
					password: bcrypt.hashSync('Ross123', bcrypt.genSaltSync(10)),
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					username: 'Rachel Green',
					password: bcrypt.hashSync('Rachel123', bcrypt.genSaltSync(10)),
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					username: 'Monica Geller',
					password: bcrypt.hashSync('Monica123', bcrypt.genSaltSync(10)),
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
		return queryInterface.bulkDelete('Users', null, {});
	}
};
