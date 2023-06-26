const nodemailer = require('nodemailer')
const config = require('./config')

const sendResetEmail = async (email, token) => {

    const transporter = nodemailer.createTransport({
        name: config.EMAIL_HOST,
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD
        }
    })

    const message = {
        to: email, 
        subject: 'Salasanan resetointi',
        text: `Hei, Olet pyytänyt salasanan uudelleen asetusta.
        Aseta uusi salasana tästä linkistä: ${config.BASEURL}/resetpassword/${token}. 
        Linkki on voimassa 24 tuntia. Tähän sähköpostiin ei voi vastata.`,
        html: `<p>Hei,</p>
        <p>Olet pyytänyt salasanan uudelleen asetusta. Aseta uusi salasana tästä linkistä:</p>
        <p><a href="${config.BASEURL}/resetpassword/${token}">Vaihda salasana</a></p>
        <p>Linkki on voimassa 24 tuntia.</p><p>Tähän sähköpostiin ei voi vastata.</p>`
    }
    
    let sentMail = false

    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(message, (error) => {
                if (error) {
                    sentMail = false
                    reject(error)
                } else {
                    sentMail = true
                    resolve()
                }
            })
        })
    } catch (exception) {
        return sentMail
    }

    return sentMail
}

module.exports = {
    sendResetEmail
}