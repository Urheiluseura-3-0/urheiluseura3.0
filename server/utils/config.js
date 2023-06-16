require('dotenv').config()

let PORT = process.env.PORT
const SECRET = process.env.SECRET
const BASEURL = process.env.NODE_ENV === 'production'
    ? 'https://urheiluseura.fly.dev'
    : 'http://localhost:3000'

const DATABASE_URL =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL

module.exports = {
    PORT,
    DATABASE_URL,
    SECRET,
    BASEURL
}