const { DataTypes } = require('sequelize')

module.exports = {

    up: async({ context: queryInterface }) => {

        await queryInterface.createTable('jobs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            created_by_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            squad: {
                type: DataTypes.TEXT,
                allowNull : false,
                validate: {
                    len: [2, 40],
                }
            },
            context: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 200],
                }
            },
            date_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40]
                }
            },
            hours: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: { args: [0.0] },
                    max: { args: [24.0] }
                }
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1
                }
            },
            confirmed_by_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        })

    },

    down: async({ context:queryInterface }) => {

        await queryInterface.dropTable('jobs')

    }
}