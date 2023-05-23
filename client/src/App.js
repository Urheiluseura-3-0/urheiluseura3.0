import { useState, useEffect } from 'react'
import loginService from './services/login'
import registerService from './services/register'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'


// App returns names requested from server
const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [newusername, createUsername] = useState('')
    const [newpassword, createPassword] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {



    }, [])
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            console.log('wrong username or password')
            setUsername('')
            setPassword('')
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            const user = await registerService.register({
                name, newusername, newpassword
            })
            setUser(user)
            createUsername('')
            createPassword('')
        } catch (exception) {
            console.log('Luonti ei onnistunut')
        }
    }


    const logged = () => (
        <div>
            <p>{user.name} kirjautuneena</p>
        </div>
    )


    return (
        <div>
            {!user && <RegisterForm handleRegister={handleRegister} name={name} setName={setName} username={newusername} setUsername={createUsername}
                password={newpassword} setPassword={createPassword} />
            }
            {!user && <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />}
            {user && logged()}
        </div>
    )
}

export default App