import axios from 'axios'
const baseUrl = '/api/reset'

const requestPasswordReset = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data

}

const resetPassword = async credentials => {
    const token = '123'
    console.log(`${baseUrl}/${token}`)
    const response = await axios.post(`${baseUrl}/${token}`, credentials)
    return response.data
}

export default { requestPasswordReset, resetPassword }