import { useState, useEffect } from 'react'
import registerService from '../services/register'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import Step0 from './steps/Step0'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'

const registerForm = () => {

    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)
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

    const [isInputValid, setIsInputValid] = useState(false)
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false)
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isFirstNameValid, setIsFirstNameValid] = useState(false)
    const [isLastNameValid, setIsLastNameValid] = useState(false)
    const [isAddressValid, setIsAddressValid] = useState(false)
    const [isPostalCodeValid, setIsPostalCodeValid] = useState(false)
    const [isCityValid, setIsCityValid] = useState(false)





    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    const handleRegister = async () => {
        try {
            await registerService.register({
                username, password, passwordConfirm, firstName, lastName, address, postalCode, city, phoneNumber, email
            })
            navigate('/home')
            resetFields()

        } catch (exception) {
            setAlertMessage(exception.response.data.error)
            setShowAlert(true)
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
            setIsUsernameValid(value.length >= 5 && value.length <= 15)
            break
        case 'password':
            setPassword(value)
            setIsPasswordValid(value.length >= 10 && value.length <= 30)
            setIsPasswordConfirmValid(value.length >= 10 && value.length <= 30 &&
                    value.localeCompare(password) === 0)
            break
        case 'passwordConfirm':
            setPasswordConfirm(value)
            setIsPasswordConfirmValid(value.length >= 10 && value.length <= 30 &&
                    value.localeCompare(password) === 0)
            break
        case 'firstname':
            setFirstName(value)
            setIsFirstNameValid(value.length >= 2 && value.length <= 40)
            break
        case 'lastname':
            setLastName(value)
            setIsLastNameValid(value.length >= 2 && value.length <= 40)
            break
        case 'address':
            setAddress(value)
            setIsAddressValid(value.length >= 2 && value.length <= 40)
            break
        case 'postalCode':
            setPostalCode(value)
            setIsPostalCodeValid(value.length === 5 && validatePostalCode(value))
            break
        case 'city':
            setCity(value)
            setIsCityValid(value.length >= 2 && value.length <= 40)
            break
        case 'phoneNumber':
            setPhoneNumber(value)
            setIsPhoneNumberValid(value.length >= 5 && value.length <= 15 && validatePhoneNumber(value))
            break
        case 'email':
            setEmail(value)
            setIsEmailValid(value.length >= 5 && value.length <= 40 && validateEmail(value))
            break
        default:
            break
        }
    }

    const validateEmail = (email) => {
        const emailPattern = /.+@.+\.[A-Za-z]+$/
        return emailPattern.test(email)
    }

    const validatePostalCode = (postalCode) => {
        const postalCodePattern = /^\d+$/
        return postalCodePattern.test(postalCode)
    }

    const sanitizePhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/[ -]/g, '')
    }

    const validatePhoneNumber = (phoneNumber) => {
        const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)
        const phoneNumberPattern = /^(\+\d+|\d+)$/
        return phoneNumberPattern.test(sanitizedPhoneNumber)
    }

    const validateFields = () => {
        if (step === 2) {
            setIsInputValid(
                isUsernameValid &&
                isPasswordValid &&
                isPasswordConfirmValid &&
                isPhoneNumberValid &&
                isEmailValid &&
                isFirstNameValid &&
                isLastNameValid &&
                isAddressValid &&
                isPostalCodeValid &&
                isCityValid
            )
        }
        else if (step === 1) {
            setIsInputValid(
                isPhoneNumberValid &&
                isEmailValid &&
                isFirstNameValid &&
                isLastNameValid &&
                isAddressValid &&
                isPostalCodeValid &&
                isCityValid
            )
        }
        else {
            setIsInputValid(
                isFirstNameValid &&
                isLastNameValid &&
                isAddressValid &&
                isPostalCodeValid &&
                isCityValid)
        }



    }

    useEffect(() => {
        validateFields()
    }, [step, username, password, passwordConfirm, firstName, lastName, address, postalCode,
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
                        address={address}
                        postalCode={postalCode}
                        city={city}
                        isInputValid={isInputValid}
                        isFirstNameValid={isFirstNameValid}
                        isLastNameValid={isLastNameValid}
                        isAddressValid={isAddressValid}
                        isPostalCodeValid={isPostalCodeValid}
                        isCityValid={isCityValid}
                    />}
                {step === 1 &&
                    <Step1
                        onNext={handleNext}
                        onBack={handleBack}
                        onChange={handleChange}
                        phoneNumber={phoneNumber}
                        email={email}
                        isInputValid={isInputValid}
                        isPhoneNumberValid={isPhoneNumberValid}
                        isEmailValid={isEmailValid}
                    />}
                {step === 2 &&
                    <Step2
                        onBack={handleBack}
                        onChange={handleChange}
                        onSubmit={handleRegister}
                        username={username}
                        password={password}
                        passwordConfirm={passwordConfirm}
                        isInputValid={isInputValid}
                        isUsernameValid={isUsernameValid}
                        isPasswordValid={isPasswordValid}
                        isPasswordConfirmValid={isPasswordConfirmValid}
                    />}
            </div >
        </div >

    )
}

export default registerForm