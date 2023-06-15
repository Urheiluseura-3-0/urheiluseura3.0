import { useState } from 'react'
import Notification from './Notification'
import { Link, useParams } from 'react-router-dom'
import resetPasswordService from '../services/resetpassword'

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] =  useState(false)

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
        <div className='flex justify-center items-center h-screen bg-stone-100'>
            <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Vaihda salasana</h1>
                {showAlert && <Notification message={alertMessage} type={alertType}/>}
                <form>
                    <div>
                        <label className='block'>Salasana</label>
                        <input id='password' type='password' className='peer border rounded p-2 w-full border-gray-300' maxLength={30} value={password} onChange={({ target }) => {
                            setPassword(target.value)
                            setIsPasswordValid(target.value.length >= 10 && target.value.length <= 30)
                            setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                            target.value.localeCompare(password) === 0)
                        }}/>{password.length === 0 || isPasswordValid ? null : (
                            <p id='password-error' className='peer-focus:hidden text-red-500 text-sm'>
                                Salasanan minimipituus on 10 merkkiä
                            </p>
                        )}
                    </div>
                    <div>
                        <label className='block'>Vahvista salasana</label>
                        <input id='passwordConfirmed' type='password' className='peer border rounded p-2 w-full border-gray-300' maxLength={30} value={passwordConfirm} onChange={({ target }) => {
                            setPasswordConfirm(target.value)
                            setIsPasswordConfirmValid(target.value.length >= 10 && target.value.length <= 30 &&
                            target.value.localeCompare(password) === 0)
                        }}/>{passwordConfirm.length === 0 || isPasswordConfirmValid ? null : (
                            <p id='passwordConfirm-error' className='peer-focus:hidden text-red-500 text-sm'>
                                Salasanat eivät täsmää tai se on liian lyhyt
                            </p>
                        )}
                    </div>
                </form>
                <button id='send' type='submit' className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${(isPasswordValid && isPasswordConfirmValid) ? '' : 'opacity-30 cursor-not-allowed hover:'}`}disabled={!(isPasswordValid && isPasswordConfirmValid)}
                    title={(isPasswordValid && isPasswordConfirmValid) ? '' : 'Tarkista salasanat'} onClick={handleReset}>Lähetä</button>
                <div>
                    <Link id='front-page-link' className='text-sm text-blue-700 underline' to="/">Takaisin etusivulle</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordForm