
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UserService from './services/user'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserView from './components/UserView'
import Cookies from 'universal-cookie'
import './style.css'
import ResetPasswordRequest from './components/ResetPasswordRequest'
import ResetPasswordForm from './components/ResetPasswordForm'



const App = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))

    const handleLogout = () => {
        UserService.logout()
        cookies.remove('Token')
        setToken('')
    }

    const handleSetToken = () => {
        const value= (cookies.get('Token'))
        setToken(value)
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            navigate('/home')
        }

    }, [])


    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                <Route path="/home" element={<UserView logout={handleLogout} />} />
                <Route path="/requestpassword" element={<ResetPasswordRequest/>} />
                <Route path="/resetpassword" element={<ResetPasswordForm/>} />
            </Routes>
        </div>
    )

}

export default App