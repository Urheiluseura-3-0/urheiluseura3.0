import jwt_decode from 'jwt-decode'
import ForemanView from './ForemanView'
import JobList from './JobList'
import EventList from './EventList'

const FrontPage = ({ token }) => {
    const decodedToken = jwt_decode(token)

    let view = null

    if (decodedToken.isAdmin === 1) {
        view = null
    }
    else if (decodedToken.isForeman === 1) {
        view = <ForemanView/>
    }
    else if (decodedToken.isSupervisor === 1) {
        view = null
    }
    else if (decodedToken.isCoach === 1) {
        view = <JobList />
    }
    else if (decodedToken.isWorker === 1) {
        view = <EventList />
    }

    return (
        <div>

            {view}
        </div>
    )
}

export default FrontPage