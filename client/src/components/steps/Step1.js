import React from 'react'
import FormField from '../FormField'
import SendButton from '../SendButton'
import BackButton from '../BackButton'
import TextAndLink from '../TextAndLink'

const Step1 = ({
    onNext,
    onBack,
    onChange,
    phoneNumber,
    email,
    isInputValid,
    isPhoneNumberValid,
    isEmailValid
}) => {
    const handleNext = (e) => {
        e.preventDefault()
        onNext()
    }
    const handleBack = (e) => {
        e.preventDefault()
        onBack()
    }

    return (
        <form>
            <div className='grid grid-cols-1 gap-4'>
                <FormField
                    label='Puhelinnumero'
                    id='phoneNumber'
                    type='text'
                    value={phoneNumber}
                    maxLength={15}
                    onChange={onChange}
                    isValid={isPhoneNumberValid}
                    errorId='phoneNumber-error'
                    errorMessage='Tarkista numero'
                />
                <FormField
                    label='Sähköposti'
                    id='email'
                    type='text'
                    value={email}
                    maxLength={40}
                    onChange={onChange}
                    isValid={isEmailValid}
                    errorId='email-error'
                    errorMessage='Tarkista sähköpostiosoite'
                />
                <div className='flex justify-between items-center space-x-5'>
                    <BackButton
                        id='back-button'
                        onClick={handleBack}
                        text='Takaisin'/>
                    <SendButton
                        id='next-button'
                        isInputValid={isInputValid}
                        onClick={handleNext}
                        message='Täytä puuttuvat kentät'
                        text='Seuraava' />
                </div>
                <div className='flex-end'>
                    <TextAndLink text='Onko sinulla jo käyttäjätunnus? ' linktext='Kirjaudu' to='/' />
                </div>

            </div>

        </form>
    )
}

export default Step1