
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import UserService from './services/user'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import FrontPage from './components/FrontPage'
import EventForm from './components/EventForm'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import UserMenu from './components/UserMenu'
import DefaultMenu from './components/DefaultMenu'
import Cookies from 'universal-cookie'
import './style.css'
import ResetPasswordRequest from './components/ResetPasswordRequest'
import ResetPasswordForm from './components/ResetPasswordForm'



const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))
    const allowedPaths = ['/event', '/job', '/jobs', '/home']
    const notLoggedInPaths = ['/', '/register', '/resetpassword/', '/requestpassword']

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
            if (notLoggedInPaths.includes(location.pathname) || location.pathname.includes('/resetpassword/')) {
                navigate(location.pathname)
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
        <div className='flex flex-col min-h-screen'>
            <div className='relative z-50 w-full'>
                {token
                    ?
                    <UserMenu handleLogout={handleLogout} />
                    :
                    <DefaultMenu />
                }
            </div>
            <div className="flex flex-grow justify-center items-center bg-stone-100">
                <div className="max-w-screen-lg p-4">
                    <Routes>
                        <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                        <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                        <Route path="/home" element={<FrontPage logout={handleLogout} />} />
                        <Route path="/event" element={<EventForm />} />
                        <Route path="/job" element={<JobForm />} />
                        <Route path="/jobs" element={<JobList />} />
                        <Route path="/requestpassword" element={<ResetPasswordRequest />} />
                        <Route path="/resetpassword/:token" element={<ResetPasswordForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    )

}

export default App