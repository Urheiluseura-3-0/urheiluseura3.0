
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
import ProtectedPath from './components/ProtectedPath'
import EventList from './components/EventList'
import ForemanView from './components/ForemanView'



const App = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [token, setToken] = useState(cookies.get('Token'))

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
                        <Route element={<ProtectedPath token={token} acceptedRoles={['notLogged']}/>}>
                            <Route path="/" element={<LoginForm tokenHandler={handleSetToken} />} />
                            <Route path="/register" element={<RegisterForm tokenHandler={handleSetToken} />} />
                            <Route path="/requestpassword" element={<ResetPasswordRequest />} />
                            <Route path="/resetpassword/:token" element={<ResetPasswordForm />} />
                        </Route>
                        <Route element={<ProtectedPath token={token}
                            acceptedRoles={['worker', 'coach', 'foreman', 'supervisor', 'admin']}/>}>
                            <Route path="/home" element={<FrontPage token={token}/>} />
                        </Route>
                        <Route element={<ProtectedPath token={token} acceptedRoles={['worker', 'admin']}/>}>
                            <Route path="/event" element={<EventForm />} />
                            <Route path="/events" element={<EventList />} />
                        </Route>
                        <Route element={<ProtectedPath token={token} acceptedRoles={['coach', 'admin']}/>}>
                            <Route path="/job" element={<JobForm />} />
                            <Route path="/jobs" element={<JobList />} />
                        </Route>
                        <Route element={<ProtectedPath token={token}
                            acceptedRoles={['foreman', 'admin']}/>}>
                            <Route path="/unconfirmed" element={<ForemanView />} />
                        </Route>
                        <Route element={<ProtectedPath token={token} acceptedRoles={[]}/>}>
                            <Route path="*"/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )

}

export default App