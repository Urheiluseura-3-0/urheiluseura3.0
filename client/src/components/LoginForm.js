import { useState, useEffect } from 'react'
import userService from '../services/user'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import FormField from './FormField'
import SendButton from './SendButton'
import TextAndLink from './TextAndLink'

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
                    <FormField
                        label='Käyttäjänimi'
                        id='username'
                        type='text'
                        value={username}
                        maxLength={15}
                        onChange={({ target }) => {
                            setUsername(target.value)
                            setIsUsernameValid(target.value.length >= 5 && target.value.length <= 15)
                        }}
                        isValid={isUsernameValid}
                        errorId='username-error'
                        errorMessage={'Käyttäjänimen minimipituus on 5 merkkiä'}
                    />
                    <FormField
                        label='Salasana'
                        id='password'
                        type='password'
                        value={password}
                        maxLength={30}
                        onChange={({ target }) => {
                            setPassword(target.value)
                            setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                        }}
                        isValid={isPasswordValid}
                        errorId='password-error'
                        errorMessage={'Salasanan minimipituus on 10 merkkiä'}
                    />

                    <SendButton
                        id='login-button'
                        isInputValid={isInputValid}
                        onClick={handleLogin}
                        message='Syötä käyttäjätunnus ja salasana'
                        text='Kirjaudu'
                    />
                    <div>
                        <TextAndLink
                            text='Unohditko salasanasi? '
                            linktext='Palauta tästä'
                            to='/requestpassword'
                            id='reset-password-link'/>
                    </div>
                    <TextAndLink
                        text='Eikö sinulla ole vielä käyttäjää? '
                        linktext='Rekisteröidy'
                        to='/register'
                        id='register-link'/>
                </div>
            </form>
        </div>

    )
}

export default LoginForm