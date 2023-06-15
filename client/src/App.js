
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import UserService from './services/user'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserView from './components/UserView'
import EventForm from './components/EventForm'
import UserMenu from './components/UserMenu'
import LogoutMenu from './components/LogoutMenu'
import Cookies from 'universal-cookie'
import './style.css'



const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))

    const handleLogout = () => {
        UserService.logout()
        cookies.remove('Token')
        setToken('')
        navigate('/')
    }

    const handleSetToken = () => {
        const value= (cookies.get('Token'))
        setToken(value)
    }

    useEffect(() => {
        if (!token) {
            if (location.pathname === '/register') {
                navigate('/register')
            } else {
                navigate('/')
            }
        } else {
            if (location.pathname === '/event') {
                navigate('/event')
            } else {
                navigate('/home')
            }
        }

    }, [])


    return (
        <div>
            <div>
                {token
                    ?
                    <UserMenu handleLogout = {handleLogout}/>
                    :
                    <LogoutMenu />
                }
            </div>
            <Routes>
                <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                <Route path="/home" element={<UserView logout={handleLogout} />} />
                <Route path="/event" element={<EventForm/>} />
            </Routes>
        </div>
    )

}

export default App