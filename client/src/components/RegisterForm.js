import { useState, useEffect } from 'react'
import registerService from '../services/register'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import Step0 from './steps/Step0'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'

const registerForm = () => {

    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [isInputValid, setIsInputValid] = useState(false)


    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleRegister = async() => {

        try {
            await registerService.register({
                username, password, passwordConfirm, firstName, lastName, address, postalCode, city, phoneNumber, email
            })
            navigate('/home')
            resetFields()

        } catch (exception) {
            setAlertMessage(exception.response.data.error)
            setShowAlert(true)
            resetFields()
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }

    const resetFields = () => {
        setUsername('')
        setPassword('')
        setPasswordConfirm('')
        setFirstName('')
        setLastName('')
        setAddress('')
        setPostalCode('')
        setCity('')
        setPhoneNumber('')
        setEmail('')
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        switch (name) {
        case 'username':
            setUsername(value)
            break
        case 'password':
            setPassword(value)
            break
        case 'passwordConfirm':
            setPasswordConfirm(value)
            break
        case 'firstname':
            setFirstName(value)
            break
        case 'lastname':
            setLastName(value)
            break
        case 'address':
            setAddress(value)
            break
        case 'postalCode':
            setPostalCode(value)
            break
        case 'city':
            setCity(value)
            break
        case 'phoneNumber':
            setPhoneNumber(value)
            break
        case 'email':
            setEmail(value)
            break
        default:
            break
        }
    }


    const validateFields = () => {
        const isUsernameValid = username.length >= 5
        const isPasswordValid = password.length >= 10 &&
            password.localeCompare(passwordConfirm) === 0
        const isPasswordConfirmValid = passwordConfirm.length >= 10 &&
            passwordConfirm.localeCompare(password) === 0
        const isFirstNameValid = firstName.length > 0
        const isLastNameValid = true
        const isAddressValid = true
        const isPostalCodeValid = true
        const isCityValid = true
        const isPhoneNumberValid = phoneNumber.length > 0
        const isEmailValid = true

        setIsInputValid(
            (step === 0 &&
                isFirstNameValid &&
                isLastNameValid &&
                isAddressValid &&
                isPostalCodeValid &&
                isCityValid) ||
            (step === 1 &&
                isPhoneNumberValid &&
                isEmailValid) ||
            (step === 2 &&
                isUsernameValid &&
                isPasswordValid &&
                isPasswordConfirmValid)
        )
    }

    useEffect(() => {
        validateFields()
    }, [username, password, passwordConfirm, firstName, lastName, address, postalCode,
        city, phoneNumber, email])

    return (
        < div className='flex justify-center items-center h-screen bg-stone-100' >
            <div className='p-6 max-w-l bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Rekisteröidy</h1>
                {showAlert && <Notification message={alertMessage} />}
                {step === 0 &&
                    <Step0
                        onNext={handleNext}
                        onChange={handleChange}
                        firstName={firstName}
                        lastName={lastName}
                        postalCode={postalCode}
                        city={city}
                        isInputValid={isInputValid} />}
                {step === 1 &&
                    <Step1
                        onNext={handleNext}
                        onBack={handleBack}
                        onChange={handleChange}
                        phoneNumber={phoneNumber}
                        email={email}
                        isInputValid={isInputValid} />}
                {step === 2 &&
                    <Step2
                        onBack={handleBack}
                        onChange={handleChange}
                        onSubmit={handleRegister}
                        username={username}
                        password={password}
                        passwordConfirm={passwordConfirm}
                        isInputValid={isInputValid}
                    />}
            </div >
        </div >

    )
}

export default registerForm