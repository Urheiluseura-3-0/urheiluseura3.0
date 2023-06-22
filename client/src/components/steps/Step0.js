import React from 'react'
import { Link } from 'react-router-dom'

const Step0 = ({
    onNext,
    onChange,
    firstName,
    lastName,
    address,
    postalCode,
    city,
    isInputValid,
    isFirstNameValid,
    isLastNameValid,
    isAddressValid,
    isPostalCodeValid,
    isCityValid
}) => {
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
                        maxLength={40}
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${firstName.length === 0 || isFirstNameValid
                            ? 'border-gray-300'
                            : 'border-red-500'
                        }`}
                    />{firstName.length === 0 || isFirstNameValid ? null : (
                        <p id='firstname-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Etunimen on oltava vähintään 2 merkkiä
                        </p>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Sukunimi</label>
                    <input
                        type='text'
                        value={lastName}
                        name='lastname'
                        maxLength={40}
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${lastName.length === 0 || isLastNameValid
                            ? 'border-gray-300'
                            : 'border-red-500'
                        }`}
                    />{lastName.length === 0 || isLastNameValid ? null : (
                        <p id='lastname-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Sukunimen on oltava vähintään 2 merkkiä
                        </p>
                    )}
                </div>
                <hr></hr>
                <div className='flex flex-col'>
                    <label className='block'>Osoite</label>
                    <input
                        type='text'
                        value={address}
                        name='address'
                        maxLength={40}
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${address.length === 0 || isAddressValid
                            ? 'border-gray-300'
                            : 'border-red-500'
                        }`}
                    />{address.length === 0 || isAddressValid ? null
                        : (
                            <p id='address-error' className='peer-focus:hidden text-red-500 text-sm'>
                                Osoitteen on oltava vähintään 2 merkkiä
                            </p>
                        )}
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Postinumero</label>
                    <input
                        type='text'
                        value={postalCode}
                        name='postalCode'
                        maxLength={5}
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${postalCode.length === 0 || isPostalCodeValid
                            ? 'border-gray-300'
                            : 'border-red-500'
                        }`}
                    />{postalCode.length === 0 || isPostalCodeValid ? null : (
                        <p id='postalCode-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Postinumero on aina 5 numeroa pitkä
                        </p>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label className='block'>Postitoimipaikka</label>
                    <input
                        type='text'
                        value={city}
                        name='city'
                        maxLength={40}
                        onChange={onChange}
                        className={`peer border rounded p-2 w-full ${city.length === 0 || isCityValid
                            ? 'border-gray-300'
                            : 'border-red-500'
                        }`}
                    />{city.length === 0 || isCityValid ? null : (
                        <p id='city-error' className='peer-focus:hidden text-red-500 text-sm'>
                            Nimen oltava vähintään 2 merkkiä pitkä
                        </p>
                    )}
                </div>

                <div className='flex justify-end'>
                    <button
                        id='next-button'
                        className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full ${isInputValid
                            ? ''
                            : 'opacity-30 cursor-not-allowed hover:'}
                            font-semibold text-white
                        }`}
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