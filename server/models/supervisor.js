const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Supervisor extends Model {}

Supervisor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'supervisor'
})

module.exports = Supervisor