import { useNavigate } from 'react-router-dom'
import EventForm from './EventForm'

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
                <EventForm/>
            </div>
        </div>
    )
}

export default userView