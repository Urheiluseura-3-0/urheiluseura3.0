const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

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
        validate: {
            len: [5,50]
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [5,50]
        }
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [5,50]
        }
    },
    identityCode: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [11]
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [5,50]
        }
    },
    zipcode: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [5],
            isInt: true
        }
    },
    city: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [5,50]
        }
    },
    phonenumber: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [5,50]
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: true,
            len: [5,50]
        }
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
    isWorker: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

module.exports = User