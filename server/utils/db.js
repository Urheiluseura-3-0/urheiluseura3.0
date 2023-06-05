const config = require('./config')
const { Sequelize, } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(config.DATABASE_URL)


const migrationConf = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
}

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('Connected to the database')
    } catch (error) {
        console.log('Failed to connect to the database:', error)
        return process.exit(1)
    }

    return null
}

const closeConnectionToDatabase = async () => {
    sequelize.close()
}

const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
}


module.exports = { sequelize, connectToDatabase, closeConnectionToDatabase, rollbackMigration }