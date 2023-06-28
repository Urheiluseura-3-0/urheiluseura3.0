import { Link } from 'react-router-dom'
import { useState } from 'react'
import Notification from './Notification'
import resetPasswordService from '../services/resetpassword'
import FormField from './FormField'
import SendButton from './SendButton'

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('')

    const [isEmailValid, setIsEmailValid] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const handlePasswordResetRequest = async (event) => {
        event.preventDefault()

        try {
            const response = await resetPasswordService.requestPasswordReset({ email })
            setEmail('')
            setIsEmailValid('')

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

    return (
        <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
            <h1 className='font-bold text-2xl text-center text-teal-500'>Unohditko salasanasi?</h1>
            {showAlert && <Notification message={alertMessage} type={alertType} />}
            <p>Anna sähköpostiosoitteesi, niin sinulle lähetetään ohjeet salasanan vaihtamiseksi.</p>
            <form>
                <div className='space-y-3'>
                    <FormField label='Sähköposti' id='email' type='text' maxlength={40} value={email}
                        onChange={({ target }) => {
                            setEmail(target.value)
                            setIsEmailValid(target.value.length >= 5 && target.value.length <= 40)
                        }}
                        isValid={isEmailValid} errorId='email-error' errorMessage='Tarkista sähköpostiosoite'
                    />
                    <SendButton id='send-request-button' isInputValid={isEmailValid}
                        onClick={handlePasswordResetRequest}
                        message='Anna kelvollinen sähköpostiosoite' text='Lähetä' />
                </div>
            </form>
            <div>
                <Link id='front-page-link' className='text-sm text-blue-700 underline' to="/">Takaisin etusivulle</Link>
            </div>
        </div>
    )
}

export default ResetPasswordRequest