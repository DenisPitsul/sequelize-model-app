'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'To do hw',
          deadline: '2024-09-13',
          user_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'To do hw',
          deadline: '2024-09-13',
          user_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'To do hw',
          deadline: '2024-09-13',
          user_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
