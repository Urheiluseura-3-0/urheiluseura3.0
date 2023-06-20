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
    try{
        await client.connect()
    }catch(error){
        console.log('Connection error', error)
    }
    let message
    let lock = await client.getMailboxLock('INBOX')

    try {
        message = await client.fetchOne(client.mailbox.exists, { source: true })

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