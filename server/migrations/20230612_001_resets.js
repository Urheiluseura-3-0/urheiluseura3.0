const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('resets', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
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

        await queryInterface.addConstraint('users', {
            fields: ['email'],
            type: 'unique',
            name: 'users_email_unique_constraint'
        })
    },

    down: async ({context:queryInterface}) => {
        await queryInterface.dropTable('resets')
        await queryInterface.removeConstraint('users', 'users_email_unique_constraint')
    },
}
