const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            len: [5,15]
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    postalCode: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5, 5]
        }
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5, 15]
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5, 40]
        }
    },
    personNumber: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: -1
    },
    adminApproved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
            max: 1
        }
    },
    isAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 1
        }
    },
    isCoach: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
            max: 1
        }
    },
    isWorker: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
            max: 1
        }
    },
    isSupervisor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 1
        }
    },
    isForeman: {
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
    modelName: 'user'
})

module.exports = User