import React from 'react'
import FormField from '../FormField'
import SendButton from '../SendButton'
import TextAndLink from '../TextAndLink'

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
        <form>
            <div className='grid grid-cols-1 gap-4'>
                <FormField
                    label='Etunimi'
                    id='firstname'
                    type='text'
                    value={firstName}
                    maxLength={40}
                    onChange={onChange}
                    isValid={isFirstNameValid}
                    errorId='firstname-error'
                    errorMessage='Etunimen on oltava vähintään 2 merkkiä'
                />
                <FormField
                    label='Sukunimi'
                    id='lastname'
                    type='text'
                    value={lastName}
                    maxLength={40}
                    onChange={onChange}
                    isValid={isLastNameValid}
                    errorId='lastname-error'
                    errorMessage='Sukunimen on oltava vähintään 2 merkkiä'
                />
                <hr></hr>
                <FormField
                    label='Osoite'
                    id='address'
                    type='text'
                    value={address}
                    maxLength={40}
                    onChange={onChange}
                    isValid={isAddressValid}
                    errorId='address-error'
                    errorMessage='Osoitteen on oltava vähintään 2 merkkiä'
                />
                <FormField
                    label='Postinumero'
                    id='postalCode'
                    type='text'
                    value={postalCode}
                    maxLength={5}
                    onChange={onChange}
                    isValid={isPostalCodeValid}
                    errorId='postalCode-error'
                    errorMessage='Postinumero on aina 5 numeroa pitkä'
                />
                <FormField
                    label='Postitoimipaikka'
                    id='city'
                    type='text'
                    value={city}
                    maxLength={40}
                    onChange={onChange}
                    isValid={isCityValid}
                    errorId='city-error'
                    errorMessage='Nimen oltava vähintään 2 merkkiä pitkä'
                />
                <div className='flex justify-end'>
                    <SendButton
                        id='next-button'
                        isInputValid={isInputValid}
                        onClick={handleNext}
                        message='Täytä puuttuvat kentät'
                        text='Seuraava'
                        className='flex justify-end'
                    />
                </div>
            </div>
            <div className='mt-3'>
                <TextAndLink text='Onko sinulla jo käyttäjätunnus? ' linktext='Kirjaudu' to='/' />
            </div>
        </form >
    )
}

export default Step0