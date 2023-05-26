import { useState }  from 'react'
import loginService from '../services/login'
import { useNavigate, Link } from 'react-router-dom'


const loginForm = ({ login }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')




    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await loginService.login({
                username, password
            })
            login()
            navigate('/home')
            setUsername('')
            setPassword('')

        } catch (exception) {
            console.log('wrong username or password')
            setUsername('')
            setPassword('')
        }
    }



    return(
        <div>
            <h1>Kirjaudu</h1>
            <form onSubmit = { handleLogin }>
                <div>
    käyttäjänimi <input
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
    salasana
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">kirjaudu</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}

export default loginForm