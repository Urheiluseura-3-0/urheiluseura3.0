const config = require('../utils/config') 
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(config.DATABASE_URL)
console.log('database_url', config.DATABASE_URL)

class User extends Model {}

User.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
})

User.sync()

module.exports = {
    User, sequelize
}