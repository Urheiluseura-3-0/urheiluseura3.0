import { useState, useEffect } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'


// App returns names requested from server
const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {



    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password
            })
            setUser(user)
            setUsername('')
            setPassword('')

        }catch (expection) {
            console.log('wrong username or password')
        }
    }




    const logged = () => (
        <div>
            <p>{user.name} kirjautuneena</p>
        </div>
    )


    return(
        <div>
            { !user  && <LoginForm
                handleLogin = {handleLogin}
                user={user}
                setUsername= {setUsername}
                password= {password}
                setPassword = {setPassword}
            /> }
            {user && logged()}
        </div>
    )
}

export default App