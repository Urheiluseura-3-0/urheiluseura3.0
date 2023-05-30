import React from 'react'
import { Link } from 'react-router-dom'

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
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4'>
                <div className='flex flex-col'>
                    <label className='block'>Käyttäjänimi</label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        maxLength={15}
                        name='username'
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${username.length === 0 || isUsernameValid ? 'border-gray-300' : 'border-red-500'}`}
                    />{username.length === 0 || isUsernameValid ? null : (
                        <p id='username-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Käyttäjänimen minimipituus on 5 merkkiä
                        </p>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Salasana</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        maxLength={30}
                        name='password'
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${password.length === 0 || isPasswordValid ? 'border-gray-300' : 'border-red-500'}`}
                    />{password.length === 0 || isPasswordValid ? null : (
                        <p id='password-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Salasanan minimipituus on 10 merkkiä
                        </p>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Vahvista Salasana</label>
                    <input
                        id='passwordConfirm'
                        type='password'
                        value={passwordConfirm}
                        maxLength={30}
                        name='passwordConfirm'
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${passwordConfirm.length === 0 || isPasswordConfirmValid ? 'border-gray-300' : 'border-red-500'}`}
                    />{passwordConfirm.length === 0 || isPasswordConfirmValid ? null : (
                        <p id='passwordConfirm-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Salasanat eivät täsmää tai se on liian lyhyt
                        </p>
                    )}
                </div>
                <div className='flex justify-between items-center space-x-5'>
                    <button
                        className='bg-gray-200 hover:bg-gray-400 px-5 py-1 leading-5 rounded-full font-semibold text-black'
                        onClick={handleBack}
                    >
                        Takaisin
                    </button>
                    <button
                        id='register-button'
                        className={`bg-teal-400 hover:bg-teal-600 px-3 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                        disabled={!isInputValid}
                        title={isInputValid ? '' : 'Täytä puuttuvat kentät'}
                        type='submit'
                    >
                        Rekisteröidy
                    </button>
                </div>
                <div>
                    <span className='text-sm text-teal-500'>Onko sinulla jo käyttäjätunnus? </span>
                    <Link className='text-sm text-blue-700 underline' to='/'>Kirjaudu</Link>
                </div>
            </div>

        </form >
    )
}

export default Step2
