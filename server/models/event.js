const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Event extends Model { }

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdById: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    opponent: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 200]
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
    confirmedById: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'event'
})

module.exports = Event