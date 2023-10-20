'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', 
    [
      {
        user_id: 1,
        book_id: 1,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 2,
        book_id: 2,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 3,
        book_id: 3,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 4,
        book_id: 4,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 5,
        book_id: 5,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 1,
        book_id: 6,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 2,
        book_id: 7,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 3,
        book_id: 8,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        user_id: 4,
        book_id: 9,
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)),
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
