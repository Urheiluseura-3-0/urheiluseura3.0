// eslint-disable-next-line no-undef
const { defineConfig } = require('cypress')

const { sendResetEmail } = require('../server/controllers/email')

const createTestEmail = require('./cypress/plugins/create-account')

const getLastEmail = require('./cypress/plugins/get-last-email')

// eslint-disable-next-line no-undef

module.exports = defineConfig({
    e2e: {
        setupNodeEvents: async (on, config) => {

            on('task', {
                async sendResetEmail({ user, pass, emailObject }) {
                    const send_Email = await sendResetEmail(user, pass, emailObject)
                    return send_Email
                },
                async createTestEmail() {
                    const testAccount = await createTestEmail()
                    return testAccount
                },
                async getLastEmail({ user, pass }) {
                    const get_Email = await getLastEmail(user, pass)
                    return get_Email
                },
            })
        },
    },
})
