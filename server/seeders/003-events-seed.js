'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: (queryInterface ) => {

        return queryInterface.bulkInsert('events', [
            {
                created_by_id: 1,
                team_id: 1,
                opponent: 'Matemaatikot',
                location: 'Exactum',
                date_time: new Date(),
                description: 'Kirjaus',
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                created_by_id: 6,
                team_id: 3,
                opponent: 'Lapset',
                location: 'Halli',
                date_time: new Date(),
                description: 'Tuomarointi',
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                created_by_id: 8,
                team_id: 4,
                opponent: 'Martat',
                location: 'Halli',
                date_time: new Date(),
                description: 'Kirijaus',
                status: 1,
                confirmed_by_id: 5,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                created_by_id: 3,
                team_id: 2,
                opponent: 'Joku hyvä',
                location: 'Koripallohalli',
                date_time: new Date(),
                description: '',
                status: 1,
                confirmed_by_id: 4,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                created_by_id: 1,
                team_id: 2,
                opponent: 'Joku hyvä',
                location: 'Koripallohalli',
                date_time: new Date(),
                description: 'Tuomarointi',
                status: 1,
                confirmed_by_id: 4,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                created_by_id: 6,
                team_id: 2,
                opponent: 'Joku hyvä',
                location: 'Koripallohalli',
                date_time: new Date(),
                description: 'Makkaranpaisto',
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ])
    },

    down: (queryInterface ) => {
        return queryInterface.bulkDelete('events', null, {})
    },
}