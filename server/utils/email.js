const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
})

const sendResetEmail = async (email, token) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, click the following link: ${token}`
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Reset email sent successfully')
    } catch (error) {
        console.error('Error sending reset email:', error)
    }
}

module.exports = {
    sendResetEmail
}