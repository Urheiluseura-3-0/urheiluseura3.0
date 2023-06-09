const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            len: [2,40]
        }
    },
    category: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 40]
        }
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'team'
})

module.exports = Team