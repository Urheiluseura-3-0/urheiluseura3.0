
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import UserService from './services/user'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import FrontPage from './components/FrontPage'
import EventForm from './components/EventForm'
import JobForm from './components/JobForm'
import UserMenu from './components/UserMenu'
import DefaultMenu from './components/DefaultMenu'
import Cookies from 'universal-cookie'
import './style.css'



const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))
    const allowedPaths = ['/event', '/job']

    const handleLogout = () => {
        UserService.logout()
        cookies.remove('Token')
        setToken('')
        navigate('/')
    }

    const handleSetToken = () => {
        const value = (cookies.get('Token'))
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
            if (allowedPaths.includes(location.pathname)) {
                navigate(location.pathname)
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
                    <UserMenu handleLogout={handleLogout} />
                    :
                    <DefaultMenu />
                }
            </div>
            <Routes>
                <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                <Route path="/home" element={<FrontPage logout={handleLogout} />} />
                <Route path="/event" element={<EventForm />} />
                <Route path="/job" element={<JobForm/>}/>
            </Routes>
        </div>
    )

}

export default App