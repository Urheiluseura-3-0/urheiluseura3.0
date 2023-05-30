import { useState, useEffect } from 'react'
import loginService from '../services/login'
import { useNavigate, Link } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = ({ login }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [isInputValid, setIsInputValid] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)



    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await loginService.login({
                username, password
            })
            login()
            navigate('/home')
            resetFields()

        } catch (exception) {
            setAlertMessage(exception.response.data.error)
            resetFields()
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }

    const resetFields = () => {
        setUsername('')
        setPassword('')
        setIsInputValid(false)
    }

    const validateFields = () => {
        setIsInputValid(
            isUsernameValid &&
            isPasswordValid)
    }

    useEffect(() => {
        validateFields()
    }, [username, password])

    return (
        <div className='flex justify-center items-center h-screen bg-stone-100'>
            <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Kirjaudu sisään</h1>
                {showAlert && <Notification message={alertMessage} />}
                <form onSubmit={handleLogin}>
                    <div className='space-y-3'>
                        <div className='pt-3'>
                            <label className='block'>Käyttäjänimi</label>
                            <input
                                id='username'
                                type='text'
                                value={username}
                                maxLength={15}
                                name='username'
                                onChange={({ target }) => {
                                    setUsername(target.value)
                                    setIsUsernameValid(target.value.length >= 5 && target.value.length <= 15)
                                }}
                                className='border border-gray-300 rounded p-2 w-full'
                            />
                        </div>
                        <div>
                            <label className='block'>Salasana</label>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                maxLength={30}
                                name='password'
                                onChange={({ target }) => {
                                    setPassword(target.value)
                                    setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                                }}
                                className='required border border-gray-300 rounded p-2 w-full'
                            />
                        </div>
                        <div>
                            <button
                                id='login-button'
                                className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                                disabled={!isInputValid}
                                title={isInputValid ? '' : 'Syötä käyttäjätunnus ja salasana'}
                                type='submit'>
                                Kirjaudu</button>
                        </div>
                    </div>
                    <div>
                        <span className='text-sm text-teal-500'>Eikö sinulla ole vielä käyttäjää? </span>
                        <Link className='text-sm text-blue-700 underline' to="/register">Rekisteröidy</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm