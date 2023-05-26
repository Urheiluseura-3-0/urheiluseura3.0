const config = require('../utils/config') 
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(config.DATABASE_URL)

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
        validate: {
            len: [5,15]
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    identityCode: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    timestamps: false,
    modelName: 'user'
})

User.sync()

module.exports = {
    User
}