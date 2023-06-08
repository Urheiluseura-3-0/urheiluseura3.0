import { useNavigate } from 'react-router-dom'
import EventList from './EventList'
//import EventList2 from './EventList2'

const userView = (props) => {
    const navigate = useNavigate()

    const logOut = () => {
        props.logout()
        navigate('/')
    }

    return (
        <div>
            <div>
                <p>Kirjautuneena</p>
                <button id='logout-button' onClick= {logOut}>Kirjaudu ulos</button>
            </div>
            <div>
                <EventList />
            </div>
        </div>
    )
}

export default userView