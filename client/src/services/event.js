import axios from 'axios'
const baseUrl = '/api/event'

const addEvent = async credentials => {

    const response = await axios.post(baseUrl, credentials)
    return response.data

}

export default { addEvent }