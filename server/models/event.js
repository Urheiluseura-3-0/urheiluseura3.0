const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Event extends Model {}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    opponent:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    location:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    dateTime:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        validate: {
            len: [0, 200]
        }
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 1
        }
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'event'
})

module.exports = Event