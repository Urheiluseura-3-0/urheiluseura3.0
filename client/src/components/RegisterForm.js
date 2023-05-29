import { useState } from 'react'
import registerService from '../services/register'
import { useNavigate, Link } from 'react-router-dom'

const registerForm = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[address, setAddress] = useState('')
    const[postalCode, setPostalCode] = useState('')
    const[city, setCity] = useState('')
    const[phoneNumber, setPhoneNumber] = useState('')
    const[email, setEmail] = useState('')

    const handleRegister = async (event) => {

        event.preventDefault()
        try {
            await registerService.register({
                username, password, firstName, lastName, address, postalCode, city, phoneNumber, email
            })
            navigate('/home')
            setUsername('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setAddress('')
            setPostalCode('')
            setCity('')
            setPhoneNumber('')
            setEmail('')
        } catch (exception) {
            console.log('Luonti ei onnistunut')
        }
    }


    return(
        <div>
            <h1>Rekisteröidy</h1>
            <form onSubmit = { handleRegister }>
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
                <div>
        etunimi <input
                        type="text"
                        value={firstName}
                        name="firstname"
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                </div>
                <div>
        sukunimi <input
                        type="text"
                        value={lastName}
                        name="lastname"
                        onChange={({ target }) => setLastName(target.value)}
                    />
                </div>
                <div>
        osoite <input
                        type="text"
                        value={address}
                        name="address"
                        onChange={({ target }) => setAddress(target.value)}
                    />
                </div>
                <div>
        postinumero <input
                        type="text"
                        value={postalCode}
                        name="postalCode"
                        onChange={({ target }) => setPostalCode(target.value)}
                    />
                </div>
                <div>
        kaupunki <input
                        type="text"
                        value={city}
                        name="city"
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <div>
        puhelinnumero <input
                        type="text"
                        value={phoneNumber}
                        name="phoneNumber"
                        onChange={({ target }) => setPhoneNumber(target.value)}
                    />
                </div>
                <div>
        email <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <button type="submit">rekisteröidy</button>
                <Link to="/">Login</Link>
            </form>
        </div>
    )
}

export default registerForm