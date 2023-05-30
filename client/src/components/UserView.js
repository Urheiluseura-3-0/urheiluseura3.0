import { useNavigate } from 'react-router-dom'

const userView = (props) => {
    const navigate = useNavigate()

    const logOut = () => {
        props.logout()
        navigate('/')
    }

    return (
        <div>
            <p>Kirjautuneena</p>
            <button id='logout-button' onClick= {logOut}>Kirjaudu ulos</button>
        </div>
    )
}

export default userView