const nodemailer = require('nodemailer')

const createAccount = async () => {
    let testAccount
    testAccount = await nodemailer.createTestAccount()

    return testAccount
}

module.exports = createAccount