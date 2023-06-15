import axios from 'axios'
const baseUrl = '/api/reset'

const requestPasswordReset = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data

}

const resetPassword = async credentials => {
    const response = await axios.post(`${baseUrl}/${credentials.token}`, credentials)
    return response.data
}

export default { requestPasswordReset, resetPassword }