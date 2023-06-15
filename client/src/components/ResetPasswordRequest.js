import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Notification from './Notification'
import resetPasswordService from '../services/resetpassword'

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('')

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] =  useState(false)

    const handlePasswordResetRequest = async (event) => {
        event.preventDefault()

        try {
            const response = await resetPasswordService.requestPasswordReset({ email })
            setEmail('')
            setAlertMessage(response.message)
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

    useEffect(() => {

    }, [email])

    return (
        <div>
            <div>
                <h1>Unohditko salasanasi?</h1>
                {showAlert && <Notification message={alertMessage} type={alertType}/>}
                <p>Anna sähköpostiosoitteesi, niin sinulle lähetetään ohjeet salasanan vaihtamiseksi.</p>
                <form>
                    <label>Sähköposti</label>
                    <input id='email' type='text' value={email} onChange={({ target }) => {
                        setEmail(target.value)
                    }}></input>
                </form>
                <button id='send-request-button' type='submit' onClick={handlePasswordResetRequest}>Lähetä</button>
            </div>
            <div>
                <Link id='front-page-link' to="/">Takaisin etusivulle</Link>
            </div>
            <div>
                <Link to="/resetpassword">(Tilapäinen linkki salasanan vaihtolomakkeelle)</Link>
            </div>
        </div>
    )
}

export default ResetPasswordRequest