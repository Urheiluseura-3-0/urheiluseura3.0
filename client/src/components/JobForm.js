import { useState, useEffect } from 'react'
import jobService from '../services/job'
import Notification from './Notification'

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
            && (parsedMinutes <= 59 && parsedMinutes >= 0 && parsedHours > 0 || (parsedMinutes <= 59 && parsedMinutes > 0))
            || (parsedHours === 24 && parsedMinutes === 0)
    }

    const validateMinutes = (minutes) => {
        const parsedMinutes = parseInt(minutes, 10)
        const parsedHours = parseInt(hours, 10)
        return parsedMinutes >= 0 && parsedMinutes <= 59
            && (23 >= parsedHours && parsedHours > 0 || 23 >= parsedHours && parsedHours >= 0 && parsedMinutes > 0)
            || (parsedHours === 24 && parsedMinutes === 0)
    }


    const renderFormError = (parameter, parameterValid, errorid, errorMessage) => {

        const changedParameter = Number.isInteger(parameter) ? parameter === 0 : parameter.valueOf() === ''

        return (
            changedParameter || parameterValid ? null : (
                <p id={errorid} className='peer-focus:hidden text-red-500 text-sm'>
                    {errorMessage}
                </p>
            )
        )
    }

    const renderClassName = (parameter, parameterValid) => {

        const changedParameter = Number.isInteger(parameter) ? parameter === 0 : parameter.valueOf() === ''

        return (
            `peer border rounded p-2 w-full ${changedParameter || parameterValid ? 'border-gray-300' : 'border-red-500'
            }`
        )
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

                    <div>
                        <label className='block'>Ryhmä</label>
                        <input id='squad' type='text' value={squad} maxLength={40}
                            onChange={({ target }) => {
                                setSquad(target.value)
                                setIsSquadValid(target.value.length >= 2 && target.value.length <= 40)
                            }}
                            className={renderClassName(squad.length, isSquadValid)}
                        />{
                            renderFormError(squad.length, isSquadValid, 'squad-error', 'Ryhmän nimen on oltava vähintään 2 merkkiä')
                        }
                    </div>
                    <div>
                        <label className='block'>Paikka</label>
                        <input id='location' type='text' value={location} maxLength={40}
                            onChange={({ target }) => {
                                setLocation(target.value)
                                setIsLocationValid(target.value.length >= 2 && target.value.length <= 40)
                            }}
                            className={renderClassName(location.length, isLocationValid)}
                        />{renderFormError(location.length, isLocationValid, 'location-error', 'Paikan nimen on oltava vähintään 2 merkkiä')}
                    </div>
                    <div>
                        <label className='block'>Päivämäärä</label>
                        <input id='date' type='date' value={date}
                            onChange={({ target }) => {
                                setDate(target.value)
                                setIsDateValid(validateDate(target.value))
                            }}
                            className={renderClassName(date, isDateValid)}
                        />{renderFormError(date, isDateValid, 'date-error', 'Tarkista päivämäärä')}
                    </div>
                    <div>
                        <label className='block'>Aloitusaika</label>
                        <input id='start-time' type='time' value={time}
                            onChange={({ target }) => {
                                setTime(target.value)
                                setIsTimeValid(validateTime(target.value))
                            }}
                            className={renderClassName(time, isTimeValid)}
                        />{renderFormError(time, isTimeValid, 'start-time-error', 'Tarkista aloitusaika')}
                    </div>
                    <h3 className='text-l'>Työaika</h3>
                    <div className='flex space-x-8'>
                        <div>
                            <label className='block'>Tunnit</label>
                            <div>
                                <input className='peer border rounded p-2 w-full border-gray-300' id='hours' type='number' value={hours} min={0} max={24}
                                    onChange={({ target }) => {
                                        setHours(target.value)
                                        setIsWorkedTimeValid(validateHours(target.value))
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block'>Minuutit</label>
                            <input className='peer border rounded p-2 w-full border-gray-300' id='minutes' type='number' value={minutes} min={0} max={59}
                                onChange={({ target }) => {
                                    setMinutes(target.value)
                                    setIsWorkedTimeValid(validateMinutes(target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block'>Lisätietoja</label>
                        <input id='context' type='text' value={context} maxLength={200}
                            onChange={({ target }) => {
                                setContext(target.value)
                                setIsContextValid(target.value.length <= 200)
                            }}
                            className={'peer border rounded p-2 w-full border-gray-300'}
                        />
                    </div>
                    <div className='flex'>
                        <button
                            id='add-job'
                            className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                            disabled={!isInputValid}
                            title={isInputValid ? null : 'Täytä puuttuvat kentät'}
                            onClick={handleSubmit}>Lähetä</button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default JobForm