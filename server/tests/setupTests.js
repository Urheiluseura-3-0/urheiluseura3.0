const { connectToDatabase, closeConnectionToDatabase } = require('../utils/db')

beforeAll(async () => {
    await connectToDatabase()
})

afterAll(async () => {
    await closeConnectionToDatabase()
}) 