const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Supervisor extends Model {}

Supervisor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'supervisor'
})

module.exports = Supervisor