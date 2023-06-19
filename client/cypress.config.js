const { defineConfig } = require('cypress')

const createTestEmail = require('./cypress/plugins/create-account')

const getLastEmail = require('./cypress/plugins/get-last-email')

const parseEmail = require('./cypress/plugins/parse-email')

module.exports = defineConfig({
    e2e: {
        // eslint-disable-next-line no-unused-vars
        setupNodeEvents: async (on, config) => {

            on('task', {
                async createTestEmail() {
                    const testAccount = await createTestEmail()
                    return testAccount
                },
                async getLastEmail({ user, pass }) {
                    const get_Email = await getLastEmail(user, pass)
                    return get_Email
                },
                async parseEmail({ message }) {
                    const parse_Email = await parseEmail(message)
                    return parse_Email
                }
            })
        },
    },
})
