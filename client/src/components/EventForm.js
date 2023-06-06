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
        <div className='flex justify-center items-center h-screen bg-stone-100'>
            <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Lisää tapahtuma</h1>
                <form>
                    <div className='space-y-3'>
                        <div className='pt-3'>
                            <label className='block'>Joukkue</label>
                            <select id='team' onChange={({ target }) => {
                                setTeam(target.value)
                                setIsTeamValid(target.value !== 0)
                            }}
                            className={`peer border rounded p-2 w-full ${team.valueOf() === '0' || isTeamValid ? 'border-gray-300' : 'border-red-500'
                            }`}
                            >
                                <option value='0'>Valitse joukkue</option>
                                {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                            </select>
                            {team.valueOf() === '0' || isTeamValid ? null : (
                                <p id='team-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Valitse jokin joukkue
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block'>Vastustaja</label>
                            <input id='opponent' type='text' value={opponent} maxLength={40}
                                onChange={({ target }) => {
                                    setOpponent(target.value)
                                    setIsOpponentValid(target.value.length >= 2 && target.value.length <= 40)
                                }}
                                className={`peer border rounded p-2 w-full ${opponent.length === 0 || isOpponentValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{opponent.length === 0 || isOpponentValid ? null : (
                                <p id='opponent-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Vastustajan on oltava vähintään 2 merkkiä
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
                                    Paikan on oltava vähintään 2 merkkiä
                                </p>
                            )}
                        </div>
                        <div>
                            <label className ='block'>Päivämäärä</label>
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
                            <label className='block'>Kellonaika</label>
                            <input id='time' type='time' value={time}
                                onChange={({ target }) => {
                                    setTime(target.value)
                                    setIsTimeValid(validateTime(target.value))
                                }}
                                className={`peer border rounded p-2 w-full ${time.valueOf() === '' || isTimeValid ? 'border-gray-300' : 'border-red-500'
                                }`}
                            />{time.valueOf() === '' || isTimeValid ? null : (
                                <p id='time-error' className='peer-focus:hidden text-red-500 text-sm'>
                                    Tarkista kellonaika
                                </p>
                            )}
                        </div>
                        <div>
                            <label className='block'>Lisätietoja</label>
                            <input id='description' type='text' value={description} maxLength={200}
                                onChange={({ target }) => {
                                    setDescription(target.value)
                                    setIsDescriptionValid(target.value.length <= 200)
                                }}
                                className={'peer border rounded p-2 w-full border-gray-300'}
                            />
                        </div>
                        <div className='flex justify-between items-center space-x-5'>
                            <button
                                id='add-event'
                                className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white ${isInputValid ? '' : 'opacity-30 cursor-not-allowed hover:'}`}
                                disabled={!isInputValid}
                                title={isInputValid ? null : 'Täytä puuttuvat kentät'}
                                onClick={handleEvent}>Lisää tapahtuma</button>
                            <button
                                id='reset'
                                className='bg-gray-200 hover:bg-gray-400 px-5 py-1 leading-5 rounded-full font-semibold text-black'
                                onClick={resetFields}>Tyhjennä tiedot</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventForm