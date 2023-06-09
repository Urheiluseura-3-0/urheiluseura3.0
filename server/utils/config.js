require('dotenv').config()

let PORT = process.env.PORT
const SECRET = process.env.SECRET

const DATABASE_URL =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL

let BASEURL = process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:3000'

if (process.env.NODE_ENV === 'test'){
    BASEURL = 'http://localhost:3001'
}
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = process.env.EMAIL_PORT

module.exports = {
    PORT,
    DATABASE_URL,
    SECRET,
    BASEURL,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_HOST,
    EMAIL_PORT
}