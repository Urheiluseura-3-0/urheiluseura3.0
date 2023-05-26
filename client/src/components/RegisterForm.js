import { useState } from 'react'
import registerService from '../services/register'

const registerForm = () => {

    // eslint-disable-next-line no-unused-vars
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            // eslint-disable-next-line no-unused-vars
            const user = await registerService.register({
                name, username, password
            })

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
                        name="newpassword"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">rekisteröidy</button>
            </form>
        </div>
    )
}

export default registerForm