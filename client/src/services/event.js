import axios from 'axios'
const baseUrl = '/api/event'

const addEvent = async eventData => {
    const response = await axios.post(baseUrl, eventData)
    return response.data

}

const getEvents = async eventData => {
    const response = await axios.get(baseUrl, eventData)
    return response.data
}

export default { addEvent, getEvents }