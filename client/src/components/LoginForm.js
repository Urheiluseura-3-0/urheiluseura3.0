import { useState, useEffect } from 'react'
import userService from '../services/user'
import { useNavigate, Link } from 'react-router-dom'
import Notification from './Notification'
import FormField from './FormField'
import SendButton from './SendButton'

const LoginForm = ({ tokenHandler }) => {
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
            await userService.login({
                username, password
            })
            tokenHandler()
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

        <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
            <h1 className='font-bold text-2xl text-center text-teal-500'>Kirjaudu sisään</h1>
            {showAlert && <Notification message={alertMessage} />}
            <form onSubmit={handleLogin}>
                <div className='space-y-3'>
                    <FormField label='Käyttäjänimi' id='username' type='text' value={username} maxLength={15}
                        onChange={({ target }) => {
                            setUsername(target.value)
                            setIsUsernameValid(target.value.length >= 5 && target.value.length <= 15)
                        }}
                        isValid={isUsernameValid}
                        errorId='username-error'
                        errorMessage={'Käyttäjänimen minimipituus on 5 merkkiä'}
                    />

                    <FormField label='Salasana' id='password' type='password' value={password} maxLength={30}
                        onChange={({ target }) => {
                            setPassword(target.value)
                            setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                        }}
                        isValid={isPasswordValid}
                        errorId='password-error'
                        errorMessage={'Salasanan minimipituus on 10 merkkiä'}
                    />

                    <SendButton id='login-button' isInputValid={isInputValid} onClick={handleLogin}
                        message='Syötä käyttäjätunnus ja salasana' text='Kirjaudu'
                    />
                    <div>
                        <span className='text-sm text-teal-500'>Unohditko salasanasi? </span>
                        <Link
                            id='reset-password-link'
                            className='text-sm text-blue-700 underline'
                            to="/requestpassword">
                            Palauta tästä
                        </Link>
                    </div>

                    <span className='text-sm text-teal-500'>Eikö sinulla ole vielä käyttäjää? </span>
                    <Link
                        id='register-link'
                        className='text-sm text-blue-700 underline'
                        to="/register">
                        Rekisteröidy
                    </Link>
                </div>
            </form>
        </div>

    )
}

export default LoginForm