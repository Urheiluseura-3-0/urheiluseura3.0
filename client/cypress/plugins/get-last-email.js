const nodemailer = require('nodemailer')

const { ImapFlow } = require('imapflow')

const getLastEmail = async (user, pass) => {
    let client = new ImapFlow({
        host: 'ethereal.email',
        port: 993,
        secure: true,
        auth: {
            user: user,
            pass: pass
        }
    })
    await console.log('client', client)
    try{
        const connection = await client.connect()
        console.log('Connection successful', connection)
    }catch(error){
        console.log('Connection error', error)
    }
    let message
    // Lukitsee mailboxin niin, että muut prosessit/asiakkaat eivär pääse muokkaamaan mailboxia yhtäaikaa
    let lock = await client.getMailboxLock('INBOX')

    try {
        message = await client.fetchOne(client.mailbox.exists, { source: true })
        // client.mailbox.exists hakee ensimmäisen viestin, source:true tuo raakaversion viestistä
    } finally {
        lock.release()
    }
    await client.logout()

    if (!message)
        return message
    else
        return message.source

}

module.exports = getLastEmail