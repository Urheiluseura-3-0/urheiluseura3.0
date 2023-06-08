'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: ( queryInterface ) => {

        return queryInterface.bulkInsert('teams', [
            {
                name: 'TKO-Äly basket',
                category: 'Harraste',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Basket edustus',
                category: 'Edustus',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Basket lapset',
                category: 'juniorit',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Basket ei kategoriaa',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
    },

    down: ( queryInterface ) => {
        return queryInterface.bulkDelete('teams', null, {})
    },
}
