const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Reset extends Model { }

Reset.init({
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
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'reset'
})

module.exports = Reset