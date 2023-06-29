import { useState } from 'react'
import Notification from './Notification'
import { Link, useParams } from 'react-router-dom'
import resetPasswordService from '../services/resetpassword'
import FormField from './FormField'
import SendButton from './SendButton'

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const { token } = useParams()

    const handleReset = async (event) => {
        event.preventDefault()

        try {
            const response = await resetPasswordService.resetPassword({ token, password, passwordConfirm })
            setAlertMessage(response.message)
            setAlertType('success')
            setShowAlert(true)
            setTimeout(() => {
                setAlertMessage('')
                setAlertType('')
                setShowAlert(false)
            }, 3000)

            setPassword('')
            setPasswordConfirm('')
            setIsPasswordValid('')
            setIsPasswordConfirmValid('')
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
            <h1 className='font-bold text-2xl text-center text-teal-500'>Vaihda salasana</h1>
            {showAlert && <Notification message={alertMessage} type={alertType} />}
            <form>
                <FormField
                    label='Salasana'
                    id='password'
                    type='password'
                    maxLength={30}
                    value={password}
                    onChange={({ target }) => {
                        setPassword(target.value)
                        setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                        setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                                                target.value.localeCompare(password) === 0)
                    }}
                    isValid={password.length === 0 || isPasswordValid}
                    errorId='password-error'
                    errorMessage='Salasanan minimipituus on 10 merkkiä'
                />
                <FormField
                    label='Vahvista salasana'
                    id='passwordConfirmed'
                    type='password'
                    maxLength={30}
                    value={passwordConfirm}
                    onChange={({ target }) => {
                        setPasswordConfirm(target.value)
                        setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                            target.value.localeCompare(password) === 0)
                    }}
                    isValid={passwordConfirm.length === 0 || isPasswordConfirmValid}
                    errorId='passwordConfirm-error'
                    errorMessage='Salasanat eivät täsmää tai se on liian lyhyt'
                />
            </form>
            <SendButton
                id='send'
                isInputValid={isPasswordValid && isPasswordConfirmValid}
                onClick={handleReset}
                message={'Tarkista salasanat'} text='Lähetä'/>
            <div>
                <Link id='front-page-link' className='text-sm text-blue-700 underline' to="/">Takaisin etusivulle</Link>
            </div>
        </div>
    )
}

export default ResetPasswordForm