import React from 'react'
import { Link } from 'react-router-dom'

const Step2 = ({ onBack, onChange, onSubmit, username, password, passwordConfirm, isInputValid }) => {
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
                        className='border border-gray-300 rounded p-2'
                    />
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
                        className='required border border-gray-300 rounded p-2 w-full'
                    />
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
                        className='required border border-gray-300 rounded p-2 w-full'
                    />
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
