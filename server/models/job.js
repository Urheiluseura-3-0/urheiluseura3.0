const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Job extends Model {}

Job.init({
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
    squad: {
        type: DataTypes.TEXT,
        allowNull : false,
        validate: {
            len: [2, 40]
        }
    },
    context: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 200]
        }
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
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

module.exports = Job

    



