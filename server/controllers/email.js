const nodemailer = require('nodemailer')

const sendResetEmail = async (email, token) => {
    const account = await nodemailer.createTestAccount()
    
    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    },
    {
        from: 'Lähettäjä <lahettaja@jokuosoite.com>'
    })

    const message = {
        to: email,
        subject: 'Salasanalinkki',
        text: `http://localhost:3000/resetpassword/${token}`,
        html: `<a href="http://localhost:3000/resetpassword/${token}">Vaihda salasana</a>`
    }


    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Viestiä ei lähetetty', error)
            return false
        }

        console.log(`Viesti lähetetty tähän osoitteeseen ${email}`, nodemailer.getTestMessageUrl(info))
    })

    return true
}

module.exports = { sendResetEmail }