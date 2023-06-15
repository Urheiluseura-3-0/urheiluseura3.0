import { useState } from 'react'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import resetPasswordService from '../services/resetpassword'

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirmed, setPasswordConfirmed] = useState('')

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] =  useState(false)

    const handleReset = async (event) => {
        event.preventDefault()

        try {
            console.log(isPasswordValid)
            console.log(isPasswordConfirmValid)
            const response = await resetPasswordService.resetPassword()
            console.log(response)
            setAlertMessage('Klikattu')
            setAlertType('success')
            setShowAlert(true)
            setTimeout(() => {
                setAlertMessage('')
                setAlertType('')
                setShowAlert(false)
            }, 3000)
        } catch (exception) {
            setAlertMessage(exception.response.data.error)
            setAlertType('error')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }

    return (
        <div>
            <h1>Vaihda salasana</h1>
            {showAlert && <Notification message={alertMessage} type={alertType}/>}
            <form>
                <div>
                    <label>Salasana</label>
                    <input id='password' type='password' value={password} onChange={({ target }) => {
                        setPassword(target.value)
                        setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                        setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                            target.value.localeCompare(password) === 0)
                    }}></input>
                </div>
                <div>
                    <label>Vahvista salasana</label>
                    <input id='passwordConfirmed' type='password' value={passwordConfirmed} onChange={({ target }) => {
                        setPasswordConfirmed(target.value)
                        setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                            target.value.localeCompare(password) === 0)
                    }}></input>
                </div>
            </form>
            <button id='send' type='submit' onClick={handleReset}>Lähetä</button>
            <div>
                <Link id='front-page-link' to="/">Takaisin etusivulle</Link>
            </div>
        </div>
    )
}

export default ResetPasswordForm