
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
<<<<<<< HEAD
import ForemanView from './components/ForemanView'
=======
import ProtectedPath from './components/ProtectedPath'
>>>>>>> origin/routing



const App = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))
<<<<<<< HEAD
    const allowedPaths = ['/event', '/job', '/jobs', '/home', '/foremanview']
    const notLoggedInPaths = ['/', '/register', '/resetpassword/', '/requestpassword']
=======
>>>>>>> origin/routing

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

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='relative z-50 w-full'>
                {token
                    ?
                    <UserMenu handleLogout={handleLogout} token={token}/>
                    :
                    <DefaultMenu />
                }
            </div>
            <div className="flex flex-grow justify-center items-center bg-stone-100">
                <div className="max-w-screen-lg p-4">
                    <Routes>
<<<<<<< HEAD
                        <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                        <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                        <Route path="/home" element={<FrontPage logout={handleLogout} />} />
                        <Route path="/event" element={<EventForm />} />
                        <Route path="/job" element={<JobForm />} />
                        <Route path="/jobs" element={<JobList />} />
                        <Route path="/requestpassword" element={<ResetPasswordRequest />} />
                        <Route path="/resetpassword/:token" element={<ResetPasswordForm />} />
                        <Route path="/foremanview" element={<ForemanView />} />
=======
                        <Route element={<ProtectedPath token={token} acceptedRoles={['notLogged']}/>}>
                            <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                            <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                            <Route path="/requestpassword" element={<ResetPasswordRequest />} />
                            <Route path="/resetpassword/:token" element={<ResetPasswordForm />} />
                        </Route>
                        <Route element={<ProtectedPath token={token}
                            acceptedRoles={['worker', 'coach', 'foreman', 'supervisor', 'admin']}/>}>
                            <Route path="/home" element={<FrontPage logout={handleLogout} />} />
                        </Route>
                        <Route element={<ProtectedPath token={token} acceptedRoles={['worker', 'coach']}/>}>
                            <Route path="/event" element={<EventForm />} />
                            <Route path="/job" element={<JobForm />} />
                        </Route>
                        <Route element={<ProtectedPath token={token} acceptedRoles={[]}/>}>
                            <Route path="*"/>
                        </Route>
>>>>>>> origin/routing
                    </Routes>
                </div>
            </div>
        </div>
    )

}

export default App