import { useState } from 'react'
import registerService from '../services/register'
import { useNavigate, Link } from 'react-router-dom'

const registerForm = () => {

    const navigate = useNavigate()
    const [newusername, setUsername] = useState('')
    const [newpassword, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleRegister = async (event) => {

        event.preventDefault()
        try {
            await registerService.register({
                name, newusername, newpassword
            })
            navigate('/home')
            setName('')
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('Luonti ei onnistunut')
        }
    }



    return(
        <div>
            <h1>Rekisteröidy</h1>
            <form onSubmit = { handleRegister }>
                <div>
        nimi <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
    käyttäjänimi <input
                        type="text"
                        value={newusername}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
    salasana
                    <input
                        type="password"
                        value={newpassword}
                        name="newpassword"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">rekisteröidy</button>
                <Link to="/">Login</Link>
            </form>
        </div>
    )
}

export default registerForm