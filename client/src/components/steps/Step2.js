import React from 'react'
import FormField from '../FormField'
import BackButton from '../BackButton'
import SendButton from '../SendButton'
import TextAndLink from '../TextAndLink'

const Step2 = ({
    onBack,
    onChange,
    onSubmit,
    username,
    password,
    passwordConfirm,
    isInputValid,
    isUsernameValid,
    isPasswordValid,
    isPasswordConfirmValid
}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    const handleBack = (e) => {
        e.preventDefault()
        onBack()
    }

    return (
        <form>
            <div className='grid grid-cols-1 gap-4'>
                <FormField
                    label='Käyttäjänimi'
                    id='username'
                    type='text'
                    value={username}
                    maxLength={15}
                    onChange={onChange}
                    isValid={isUsernameValid}
                    errorId='username-error'
                    errorMessage='Käyttäjänimen minimipituus on 5 merkkiä'
                />
                <FormField
                    label='Salasana'
                    id='password'
                    type='password'
                    value={password}
                    maxLength={30}
                    onChange={onChange}
                    isValid={isPasswordValid}
                    errorId='password-error'
                    errorMessage='Salasanan minimipituus on 10 merkkiä'
                />
                <FormField
                    label='Vahvista Salasana'
                    id='passwordConfirm'
                    type='password'
                    value={passwordConfirm}
                    maxLength={30}
                    onChange={onChange}
                    isValid={isPasswordConfirmValid}
                    errorId='passwordConfirm-error'
                    errorMessage='Salasanat eivät täsmää tai se on liian lyhyt'
                />
                <div className='flex justify-between items-center space-x-5'>
                    <BackButton
                        id='back-button'
                        onClick={handleBack}
                        text='Takaisin' />
                    <SendButton
                        id='register-button'
                        isInputValid={isInputValid}
                        onClick={handleSubmit}
                        message='Täytä puuttuvat kentät'
                        text='Rekisteröidy' />
                </div>
                <div>
                    <TextAndLink text='Onko sinulla jo käyttäjätunnus? ' linktext='Kirjaudu' to='/' />
                </div>
            </div>

        </form >
    )
}

export default Step2
