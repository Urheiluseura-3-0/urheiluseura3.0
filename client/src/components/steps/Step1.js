import React from 'react'
import { Link } from 'react-router-dom'

const Step1 = ({ onNext, onBack, onChange, phoneNumber, email, isInputValid }) => {
    const handleNext = (e) => {
        e.preventDefault()
        onNext()
    }
    const handleBack = (e) => {
        e.preventDefault()
        onBack()
    }

    return (
        <form onSubmit={handleNext}>
            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <label className='block'>Puhelinnumero</label>
                    <input
                        type='text'
                        value={phoneNumber}
                        name='phoneNumber'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Sähköposti</label>
                    <input
                        type='text'
                        value={email}
                        name='email'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
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
                        className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                        disabled={!isInputValid}
                        title={isInputValid ? '' : 'Täytä puuttuvat kentät'}
                        type='submit'
                    >
                        Seuraava
                    </button>
                    <div className='flex-end'>
                        <span className='text-sm text-teal-500'>Onko sinulla jo käyttäjätunnus? </span>
                        <Link className='text-sm text-blue-700 underline' to='/'>Kirjaudu</Link>
                    </div>
                </div>

            </div>

        </form>
    )
}

export default Step1