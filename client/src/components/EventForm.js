import { useState, useEffect } from 'react'
import eventService from '../services/event'
import { useNavigate } from 'react-router-dom'

const EventForm = () => {
    const navigate = useNavigate()
    const [team, setTeam] = useState('0')
    const [opponent, setOpponent] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')

    const [isInputValid, setIsInputValid] = useState(false)
    const [isTeamValid, setIsTeamValid] = useState(false)
    const [isOpponentValid, setIsOpponentValid] = useState(false)
    const [isLocationValid, setIsLocationValid] = useState(false)
    const [isDateValid, setIsDateValid] = useState(false)
    const [isTimeValid, setIsTimeValid] = useState(false)
    const [isDescriptionValid, setIsDescriptionValid] = useState(true)

    const handleEvent = async (event) => {
        console.log('input', team, opponent, location, date, time, description)
        event.preventDefault()
        if (isInputValid) {
            try {
                await eventService.addEvent({
                    team, opponent, location, date, time, description
                })
                navigate('/home')
                resetFields()
                window.location.reload()
            } catch (exception) {
                const syote = `Joukkue: ${team} Vastustaja: ${opponent} Paikka ${location} Päivä: ${date} Aika: ${time} Kuvaus: ${description}`
                console.log(syote)
                resetFields()
                window.location.reload()
            }
        } else {
            console.log('Virheellinen syöte')
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

    const teams = [
        { name: 'Joukkue 1', id: '1' },
        { name: 'Joukkue 2', id: '2' },
        { name: 'Joukkue 3', id: '3' }
    ]

    useEffect(() => {
        validateFields()
    }, [team, opponent, location, date, time, description])

    return (
        <div>
            <h1>Lisää tapahtuma</h1>
            <form>
                <div>
                    <label>Joukkue</label>
                    <select id='team' onChange={({ target }) => {
                        setTeam(target.value)
                        setIsTeamValid(target.value !== 0)
                    }}>
                        <option value='0'>Valitse joukkue</option>
                        {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                    </select>
                    {isTeamValid ? null : (
                        <p id='team-error'>Valitse jokin joukkue</p>
                    )}
                </div>
                <div>
                    <label>Vastustaja</label>
                    <input id='opponent' type='text' value={opponent} maxLength={40}
                        onChange={({ target }) => {
                            setOpponent(target.value)
                            setIsOpponentValid(target.value.length >= 2 && target.value.length <= 40)
                        }}/>
                    {isOpponentValid ? null : (
                        <p id='opponent-error'>Vastustajan on oltava vähintään 2 merkkiä</p>
                    )}
                </div>
                <div>
                    <label>Paikka</label>
                    <input id='location' type='text' value={location} maxLength={40}
                        onChange={({ target }) => {
                            setLocation(target.value)
                            setIsLocationValid(target.value.length >= 2 && target.value.length <= 40)
                        }}/>
                    {isLocationValid ? null : (
                        <p id='location-error'>Paikan on oltava vähintään 2 merkkiä</p>
                    )}
                </div>
                <div>
                    <label>Päivämäärä</label>
                    <input id='date' type='date' value={date}
                        onChange={({ target }) => {
                            setDate(target.value)
                            setIsDateValid(validateDate(target.value))
                        }}/>
                    {isDateValid ? null : (
                        <p id='date-error'>Tarkista päivämäärä</p>
                    )}
                </div>
                <div>
                    <label>Kellonaika</label>
                    <input id='time' type='time' value={time}
                        onChange={({ target }) => {
                            setTime(target.value)
                            setIsTimeValid(validateTime(target.value))
                        }}/>
                    {isTimeValid ? null : (
                        <p id='time-error'>Tarkista kellonaika</p>
                    )}
                </div>
                <div>
                    <label>Lisätietoja</label>
                    <input id='description' type='text' value={description} maxLength={200}
                        onChange={({ target }) => {
                            setDescription(target.value)
                            setIsDescriptionValid(target.value.length <= 200)
                        }}/>
                </div>
                <div>
                    <button id='add-event' disabled={!isInputValid}
                        title={isInputValid ? null : 'Täytä puuttuvat kentät'}
                        onClick={handleEvent}>Lisää tapahtuma</button>
                </div>
                <div>
                    <button id='reset' onClick={resetFields}>Tyhjennä tiedot</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm