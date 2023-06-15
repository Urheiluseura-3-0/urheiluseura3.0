import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Notification from './Notification'
import resetPasswordService from '../services/resetpassword'

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('')

    const [isEmailValid, setIsEmailValid] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] =  useState(false)

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

    useEffect(() => {

    }, [email])

    return (
        <div className='flex justify-center items-center h-screen bg-stone-100'>
            <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Unohditko salasanasi?</h1>
                {showAlert && <Notification message={alertMessage} type={alertType}/>}
                <p>Anna sähköpostiosoitteesi, niin sinulle lähetetään ohjeet salasanan vaihtamiseksi.</p>
                <form>
                    <div className='space-y-3'>
                        <div className='pt-3'>
                            <label className='block'>Sähköposti</label>
                            <input id='email' type='text' className='peer border rounded p-2 w-full border-gray-300' maxLength={40} value={email} onChange={({ target }) => {
                                setEmail(target.value)
                                setIsEmailValid(target.value.length >= 5 && target.value.length <= 40)
                            }}></input>
                        </div>
                        <button id='send-request-button'
                            className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isEmailValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                            disabled={!isEmailValid}
                            title={isEmailValid ? '' : 'Anna kelvollinen sähköpostiosoite'}
                            type='submit'
                            onClick={handlePasswordResetRequest}>Lähetä</button>
                    </div>
                </form>
                <div>
                    <Link id='front-page-link' className='text-sm text-blue-700 underline' to="/">Takaisin etusivulle</Link>
                </div>
            </div>

        </div>
    )
}

export default ResetPasswordRequest