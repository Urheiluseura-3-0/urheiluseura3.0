import axios from 'axios'
const baseUrl = '/api/job'

const addJob = async jobData => {
    const response = await axios.post(baseUrl, jobData)
    return response.data

}

const getJobs = async jobData => {
    const response = await axios.get(baseUrl, jobData)
    return response.data
}

export default { addJob, getJobs }