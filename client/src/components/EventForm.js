import { useState, useEffect } from 'react'
import eventService from '../services/event'
import teamService from '../services/team'
import Notification from './Notification'
import FormField from './FormField'
import SendButton from './SendButton'
import FormDropdown from './FormDropdown'

const EventForm = () => {
    const [team, setTeam] = useState('0')
    const [teams, setTeams] = useState([])
    const [opponent, setOpponent] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [isInputValid, setIsInputValid] = useState(false)
    const [isTeamValid, setIsTeamValid] = useState(false)
    const [isOpponentValid, setIsOpponentValid] = useState(false)
    const [isLocationValid, setIsLocationValid] = useState(false)
    const [isDateValid, setIsDateValid] = useState(false)
    const [isTimeValid, setIsTimeValid] = useState(false)
    const [isDescriptionValid, setIsDescriptionValid] = useState(true)

    const handleEvent = async (event) => {
        event.preventDefault()
        try {
            await eventService.addEvent({
                team, opponent, location, date, time, description
            })
            resetFields()
            setAlertMessage('Tapahtuma lisätty')
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
        setTeam('0')
        setOpponent('')
        setLocation('')
        setDate('')
        setTime('')
        setDescription('')
        setIsInputValid(false)
        setIsTeamValid(false)
        setIsOpponentValid(false)
        setIsLocationValid(false)
        setIsDateValid(false)
        setIsTimeValid(false)
        setIsDescriptionValid(true)
    }

    const validateFields = () => {
        setIsInputValid(isTeamValid && isOpponentValid && isLocationValid && isDateValid &&
            isTimeValid && isDescriptionValid)
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

    const getTeams = async () => {
        const teams = await teamService.getTeams()
        setTeams(teams)
    }

    useEffect(() => {
        validateFields()
    }, [team, opponent, location, date, time, description])

    useEffect(() => {
        getTeams()
    }, [])

    return (

        <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
            <h1 className='font-bold text-2xl text-center text-teal-500'>Lisää tapahtuma</h1>
            {showAlert && <Notification type={alertType} message={alertMessage} />}
            <form>
                <div className='space-y-3'>
                    <FormDropdown label='Joukkue' id='team' value={team}
                        onChange={({ target }) => {
                            setTeam(target.value)
                            setIsTeamValid(target.value > 0)
                        }}
                        isValid={(!isOpponentValid || isTeamValid)}
                        title='Valitse joukkue'
                        dropdown={teams}
                        errorId='team-error'
                        errorMessage='Valitse jokin joukkue'
                    />
                    <FormField label='Vastustaja' id='opponent' type='text' value={opponent} maxLength={40}
                        onChange={({ target }) => {
                            setOpponent(target.value)
                            setIsOpponentValid(target.value.length >= 2 && target.value.length <= 40)
                        }}
                        isValid={isOpponentValid}
                        errorId='opponent-error'
                        errorMessage='Vastustajan on oltava vähintään 2 merkkiä'
                    />
                    <FormField label='Paikka' id='location' type='text' value={location} maxLength={40}
                        onChange={({ target }) => {
                            setLocation(target.value)
                            setIsLocationValid(target.value.length >= 2 && target.value.length <= 40)
                        }}
                        isValid={isLocationValid}
                        errorId='location-error'
                        errorMessage='Paikan on oltava vähintään 2 merkkiä'
                    />
                    <FormField label='Päivämäärä' id='date' type='date' value={date}
                        onChange={({ target }) => {
                            setDate(target.value)
                            setIsDateValid(validateDate(target.value))
                        }}
                        isValid={isDateValid}
                        errorId='date-error'
                        errorMessage='Tarkista päivämäärä'
                    />
                    <FormField label='Kellonaika' id='time' type='time' value={time}
                        onChange={({ target }) => {
                            setTime(target.value)
                            setIsTimeValid(validateTime(target.value))
                        }}
                        isValid={isTimeValid}
                        errorId='time-error'
                        errorMessage='Tarkista kellonaika'
                    />
                    <FormField label='Lisätietoja' id='description' type='text' value={description} maxLength={200}
                        onChange={({ target }) => {
                            setDescription(target.value)
                            setIsDescriptionValid(target.value.length <= 200)
                        }}
                        isValid={isDescriptionValid}
                    />
                    <div className='flex'>
                        <SendButton id='add-event' isInputValid={isInputValid} onClick={handleEvent}
                            message='Täytä puuttuvat kentät' text='Lisää tapahtuma' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EventForm