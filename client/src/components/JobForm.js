import { useState, useEffect } from 'react'
import jobService from '../services/job'
import Notification from './Notification'
import FormField from './FormField'
import SendButton from './SendButton'

const JobForm = () => {
    const [squad, setSquad] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [context, setContext] = useState('')
    const [hours, setHours] = useState('0')
    const [minutes, setMinutes] = useState('0')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [isInputValid, setIsInputValid] = useState(false)
    const [isSquadValid, setIsSquadValid] = useState(false)
    const [isLocationValid, setIsLocationValid] = useState(false)
    const [isDateValid, setIsDateValid] = useState(false)
    const [isTimeValid, setIsTimeValid] = useState(false)
    const [isContextValid, setIsContextValid] = useState(true)
    const [isWorkedTimeValid, setIsWorkedTimeValid] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await jobService.addJob({
                squad, context, location, date, time, hours, minutes
            })
            resetFields()
            setAlertMessage('Työtunnit lähetetty')
            setAlertType('success')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        } catch (exception) {
            setAlertMessage(exception.response.data.error)
            setAlertType('error')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
        }
    }

    const resetFields = () => {
        setSquad('')
        setLocation('')
        setDate('')
        setTime('')
        setContext('')
        setHours('0')
        setMinutes('0')
        setIsInputValid(false)
        setIsSquadValid(false)
        setIsLocationValid(false)
        setIsDateValid(false)
        setIsTimeValid(false)
        setIsContextValid(true)
        setIsWorkedTimeValid(false)
    }

    const validateFields = () => {
        setIsInputValid(isSquadValid && isLocationValid && isDateValid &&
            isTimeValid && isContextValid && isWorkedTimeValid)
    }

    const validateDate = (date) => {
        let pattern = /^\d{4}-\d{2}-\d{2}$/
        if (pattern.test(date)) {
            pattern = /^20/
            return pattern.test(date)
        }
    }

    const validateTime = (time) => {
        const pattern = /^\d{2}:\d{2}$/
        return pattern.test(time)
    }

    const validateHours = (hours) => {
        const parsedHours = parseInt(hours, 10)
        const parsedMinutes = parseInt(minutes, 10)
        return parsedHours >= 0 && parsedHours <= 23
            && (parsedMinutes <= 59 && parsedMinutes >= 0
            && parsedHours > 0
            || (parsedMinutes <= 59 && parsedMinutes > 0))
            || (parsedHours === 24 && parsedMinutes === 0)
    }

    const validateMinutes = (minutes) => {
        const parsedMinutes = parseInt(minutes, 10)
        const parsedHours = parseInt(hours, 10)
        return parsedMinutes >= 0 && parsedMinutes <= 59
            && (23 >= parsedHours && parsedHours > 0 || 23 >= parsedHours && parsedHours >= 0 && parsedMinutes > 0)
            || (parsedHours === 24 && parsedMinutes === 0)
    }


    useEffect(() => {
        validateFields()
    }, [squad, location, date, time, context, hours, minutes])

    return (
        <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
            <h1 className='font-bold text-2xl text-center text-teal-500'>Lisää työtunnit</h1>
            {showAlert && <Notification type={alertType} message={alertMessage} />}
            <form>
                <div className='space-y-3'>

                    <FormField
                        label='Ryhmä'
                        id='squad'
                        type='text'
                        value={squad}
                        maxLength={40}
                        onChange={({ target }) => {
                            setSquad(target.value)
                            setIsSquadValid(target.value.length >= 2 && target.value.length <= 40)
                        }}
                        isValid={isSquadValid}
                        errorId='squad-error'
                        errorMessage={'Ryhmän nimen on oltava vähintään 2 merkkiä'}
                    />
                    <FormField
                        label='Paikka'
                        id='location'
                        type='text'
                        value={location}
                        maxLength={40}
                        onChange={({ target }) => {
                            setLocation(target.value)
                            setIsLocationValid(target.value.length >= 2 && target.value.length <= 40)
                        }}
                        isValid={isLocationValid}
                        errorId='location-error'
                        errorMessage={'Paikan on oltava vähintään 2 merkkiä'}
                    />
                    <FormField
                        label='Päivämäärä'
                        id='date'
                        type='date'
                        value={date}
                        onChange={({ target }) => {
                            setDate(target.value)
                            setIsDateValid(validateDate(target.value))
                        }}
                        isValid={isDateValid}
                        errorId='date-error'
                        errorMessage={'Tarkista päivämäärä'}
                    />
                    <FormField
                        label='Aloitusaika'
                        id='start-time'
                        type='time'
                        value={time}
                        onChange={({ target }) => {
                            setTime(target.value)
                            setIsTimeValid(validateTime(target.value))
                        }}
                        isValid={isTimeValid}
                        errorId='start-time-error'
                        errorMessage={'Tarkista aloitusaika'}
                    />
                    <h3 className='text-l'>Työaika</h3>
                    <div className='flex space-x-8'>
                        <FormField
                            label='Tunnit'
                            id='hours'
                            type='number'
                            value={hours}
                            min={0}
                            max={24}
                            onChange={({ target }) => {
                                setHours(target.value)
                                setIsWorkedTimeValid(validateHours(target.value))
                            }}
                            isValid={isWorkedTimeValid}
                        />
                        <FormField
                            label='Minuutit'
                            id='minutes'
                            type='number'
                            value={minutes}
                            min={0}
                            max={59}
                            onChange={({ target }) => {
                                setMinutes(target.value)
                                setIsWorkedTimeValid(validateMinutes(target.value))
                            }}
                            isValid={isWorkedTimeValid}
                        />
                    </div>
                    <FormField
                        label='Lisätietoja'
                        id='context'
                        type='text'
                        value={context}
                        maxLength={200}
                        onChange={({ target }) => {
                            setContext(target.value)
                            setIsContextValid(target.value.length <= 200)
                        }}
                        isValid={isContextValid}
                    />
                    <div className='flex'>
                        <SendButton
                            id='add-job'
                            isInputValid={isInputValid}
                            onClick={handleSubmit}
                            message='Täytä puuttuvat kentät'
                            text='Lähetä' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default JobForm