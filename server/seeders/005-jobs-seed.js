'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: (queryInterface) => {

        return queryInterface.bulkInsert('jobs', [
            {
                created_by_id: 2,
                squad: 'Lapset 6-8 v.',
                context: 'Lasten koripallovalmennus',
                date_time: new Date(),
                location: 'Espoon alakoulu',
                hours: 1.0,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 2,
                squad: 'Aikuiset',
                context: 'Kevyt palloilu',
                date_time: new Date(),
                location: 'Espoon alakoulu',
                hours: 2.0,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 2,
                squad: 'Lapset 8-10 v.',
                context: 'Lasten koripallovalmennus',
                date_time: new Date(),
                location: 'Espoon alakoulu',
                hours: 1.5,
                status: 1,
                confirmed_by_id: 9,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 2,
                squad: 'Lapset 6-8 v.',
                context: 'Lasten koripallovalmennus',
                date_time: new Date('2023-06-12 12:00:00.000+00'),
                location: 'Espoon alakoulu',
                hours: 1.5,
                status: 1,
                confirmed_by_id: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 3,
                squad: 'Tenavat',
                context: 'Kesäkerho',
                date_time: new Date(),
                location: 'Kumpulan liikuntahalli',
                hours: 1.00,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 3,
                squad: 'Naiset EBT-3',
                context: 'Keskiviikon treenit',
                date_time: new Date(),
                location: 'Espoon keskus liikuntahalli',
                hours: 2.5,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 3,
                squad: 'Pojat 2013',
                context: 'Tekniikkatunti',
                date_time: new Date(),
                location: 'Arabian ala-aste',
                hours: 1.25,
                status: 1,
                confirmed_by_id: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 3,
                squad: 'Miehet - Farmi',
                context: 'Perjantairyhmä',
                date_time: new Date(),
                location: 'Liikuntakeskus',
                hours: 2.00,
                status: 1,
                confirmed_by_id: 9,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 7,
                squad: 'Tytöt 2009',
                context: 'Perjantain kesäkerho',
                date_time: new Date(),
                location: 'Espoon yläkoulu',
                hours: 2.0,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 7,
                squad: 'Pojat 2009',
                context: 'Torstain kesäkerho',
                date_time: new Date('2023-06-10 12:00:00.000+00'),
                location: 'Kumpulan kampus',
                hours: 2.00,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 7,
                squad: 'Pojat 2009',
                context: 'Torstain kesäkerho',
                date_time: new Date(),
                location: 'Kumpulan kampus',
                hours: 2.00,
                status: 1,
                confirmed_by_id: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 7,
                squad: 'Miehet EBT-V',
                context: 'Maanantain ryhmä',
                date_time: new Date(),
                location: 'Kivenlahden liikuntahalli',
                hours: 3.25,
                status: 1,
                confirmed_by_id: 9,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 8,
                squad: 'Miehet EBT-V',
                context: 'Maanantain ryhmä',
                date_time: new Date(),
                location: 'Kivenlahden liikuntahalli',
                hours: 3.25,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 8,
                squad: 'Aikuiset',
                context: 'Kevyt palloilu',
                date_time: new Date(),
                location: 'Espoon alakoulu',
                hours: 2.0,
                status: 0,
                confirmed_by_id: null,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 8,
                squad: 'Pojat 2009',
                context: 'Torstain kesäkerho',
                date_time: new Date(),
                location: 'Kumpulan kampus',
                hours: 2.00,
                status: 1,
                confirmed_by_id: 5,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                created_by_id: 8,
                squad: 'Miehet EBT-V',
                context: 'Maanantain ryhmä',
                date_time: new Date(),
                location: 'Kivenlahden liikuntahalli',
                hours: 3.25,
                status: 1,
                confirmed_by_id: 9,
                created_at: new Date(),
                updated_at: new Date()
            },


        ])
    }, 

    down: (queryInterface) => {
        return queryInterface.bulkDelete('jobs', null, {})
    }
}