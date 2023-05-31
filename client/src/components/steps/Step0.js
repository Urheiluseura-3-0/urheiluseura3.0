import React from 'react'
import { Link } from 'react-router-dom'

const Step0 = ({ onNext, onChange, firstName, lastName, address, postalCode, city, isInputValid }) => {
    const handleNext = (e) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleNext}>
            <div className='grid grid-cols-1 gap-4'>
                <div className='flex flex-col'>
                    <label className='block'>Etunimi</label>
                    <input
                        type='text'
                        value={firstName}
                        name='firstname'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Sukunimi</label>
                    <input
                        type='text'
                        value={lastName}
                        name='lastname'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>
                <hr></hr>
                <div className='flex flex-col'>
                    <label className='block'>Osoite</label>
                    <input
                        type='text'
                        value={address}
                        name='address'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Postinumero</label>
                    <input
                        type='text'
                        value={postalCode}
                        name='postalCode'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Postitoimipaikka</label>
                    <input
                        type='text'
                        value={city}
                        name='city'
                        onChange={onChange}
                        className='border border-gray-300 rounded p-2 w-full'
                    />
                </div>

                <div className='flex justify-end'>
                    <button
                        id='next-button'
                        className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                        disabled={!isInputValid}
                        title={isInputValid ? '' : 'Täytä puuttuvat kentät'}
                        type='submit'
                    >
                        Seuraava
                    </button>
                </div>

            </div>
            <div className='mt-3'>
                <span className='text-sm text-teal-500'>Onko sinulla jo käyttäjätunnus? </span>
                <Link className='text-sm text-blue-700 underline' to='/'>Kirjaudu</Link>
            </div>
        </form >
    )
}

export default Step0