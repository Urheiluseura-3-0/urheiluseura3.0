import axios from 'axios'
const baseUrl = '/api/team'

const getTeams = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getTeams }