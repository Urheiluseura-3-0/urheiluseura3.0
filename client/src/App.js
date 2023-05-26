
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserView from './components/UserView'
import Cookies from 'universal-cookie'



const App = () => {
    const navigate = useNavigate()
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
        if(!token){
            navigate('/')
        }else{
            navigate('/home')
        }

    }, [])


    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm login = {handleLogin}/>}/>
                <Route path="/register" element = {<RegisterForm/>}/>
                <Route path="/home" element = {<UserView logout= {handleLogout} />}/>
            </Routes>
        </div>
    )

}

export default App