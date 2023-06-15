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


    const handleEvent = async (event) => {
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
        setHours(0)
        setMinutes(0)
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
        return parsedHours >= 0 && parsedHours <= 24 && (parsedHours > 0 || minutes > 0)
    }

    const validateMinutes = (minutes) => {
        const parsedMinutes = parseInt(minutes, 10)
        return parsedMinutes >= 0 && parsedMinutes <= 59 && (hours > 0 || parsedMinutes > 0)
    }

    useEffect(() => {
        validateFields()
    }, [squad, location, date, time, context, hours, minutes])

    return (
        <div className='flex justify-center items-center h-screen bg-stone-100'>
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
                                className={`peer border rounded p-2 w-full ${squad.length === 0 || isSquadValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{squad.length === 0 || isSquadValid ? null : (
                                <p id='squad-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Ryhmän nimen on oltava vähintään 2 merkkiä
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block'>Paikka</label>
                            <input id='location' type='text' value={location} maxLength={40}
                                onChange={({ target }) => {
                                    setLocation(target.value)
                                    setIsLocationValid(target.value.length >= 2 && target.value.length <= 40)
                                }}
                                className={`peer border rounded p-2 w-full ${location.length === 0 || isLocationValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{location.length === 0 || isLocationValid ? null : (
                                <p id='location-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Paikan nimen on oltava vähintään 2 merkkiä
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block'>Päivämäärä</label>
                            <input id='date' type='date' value={date}
                                onChange={({ target }) => {
                                    setDate(target.value)
                                    setIsDateValid(validateDate(target.value))
                                }}
                                className={`peer border rounded p-2 w-full ${date.valueOf() === '' || isDateValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{date.valueOf() === '' || isDateValid ? null : (
                                <p id='date-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Tarkista päivämäärä
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block'>Aloitusaika</label>
                            <input id='start-time' type='time' value={time}
                                onChange={({ target }) => {
                                    setTime(target.value)
                                    setIsTimeValid(validateTime(target.value))
                                }}
                                className={`peer border rounded p-2 w-full ${time.valueOf() === '' || isTimeValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{time.valueOf() === '' || isTimeValid ? null : (
                                <p id='start-time-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Tarkista aloitusaika
                                </p>
                            )}
                        </div>
                        <h3 className='text-l'>Työaika</h3>
                        <div className='flex space-x-8'>
                            <div>
                                <label className='block'>Tunnit</label>
                                <input id='hours' type='number' value={hours} min={0} max={24}
                                    onChange={({ target }) => {
                                        setHours(target.value)
                                        setIsWorkedTimeValid(validateHours(target.value))
                                    }}
                                />
                            </div>
                            <div>
                                <label className='block'>Minuutit</label>
                                <input id='minutes' type='number' value={minutes} min={0} max={59}
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
                                id='add-event'
                                className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                                disabled={!isInputValid}
                                title={isInputValid ? null : 'Täytä puuttuvat kentät'}
                                onClick={handleEvent}>Lähetä</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JobForm