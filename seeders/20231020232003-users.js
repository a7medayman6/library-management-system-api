'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', 
    [
      {
        name: 'John Doe',
        email: 'john@gmail.com'
      }, 
      {
          name: 'Jane Doe',
          email: 'jane@gmail.com'
      },
      {
            name: 'Ahmed',
            email: 'ahmed@gmail.com'
      },
      {
            name: 'Ali',
            email: 'ali@gmail.com'
      },
      {
            name: 'Mohamed',
            email: 'mohamed@gmail.com'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
