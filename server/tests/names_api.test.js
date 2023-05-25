const supertest = require('supertest')
const {app, sequelize} = require('../index')

const api = supertest(app)

test('names are returned as json', async () => {
    await api
      .get('/api/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(async () => {
    await sequelize.close()
  })

