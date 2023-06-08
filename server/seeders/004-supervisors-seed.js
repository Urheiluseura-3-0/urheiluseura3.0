'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: ( queryInterface ) => {

        return queryInterface.bulkInsert('supervisors', [
            {
                user_id: 4, 
                team_id: 2, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 4, 
                team_id: 1, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 3, 
                team_id: 2, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 5, 
                team_id: 4, 
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: 1, 
                team_id: 4, 
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
    },

    down: ( queryInterface ) => {
        return queryInterface.bulkDelete('supervisors', null, {})
    },
}