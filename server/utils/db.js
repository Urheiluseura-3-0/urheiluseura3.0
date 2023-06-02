const config = require('./config')
const { Sequelize, } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(config.DATABASE_URL)

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: 'migrations/*.js',
        },
        storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
        context: sequelize.getQueryInterface(),
        logger: console,
    })

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


module.exports = { closeConnectionToDatabase, connectToDatabase, sequelize }