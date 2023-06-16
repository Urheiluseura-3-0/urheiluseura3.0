const nodemailer = require('nodemailer')

const createAccount = async () => {
    let testAccount
    testAccount = await nodemailer.createTestAccount()
    console.log('new email account', testAccount.user)
    console.log('password is ', testAccount.pass)

    return testAccount
}

module.exports = createAccount