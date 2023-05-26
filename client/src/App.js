/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserView from './components/UserView'
import Cookies from 'universal-cookie'


const App = () => {

    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))


    const handleLogout = () => {
        cookies.remove('Token')
        setToken('')
    }

    const handleLogin = () => {
        const value= (cookies.get('Token'))
        setToken(value)
    }

    useEffect(() => {

    }, [])


    return (
        <div>
            {!token
                ?
                <>
                    <RegisterForm />
                    <LoginForm login = {handleLogin}/>
                </>
                :
                <UserView logout= {handleLogout} />
            }
        </div>

    )

}

export default App