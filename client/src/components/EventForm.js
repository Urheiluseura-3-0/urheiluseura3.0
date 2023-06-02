import { useState, useEffect } from 'react'
import eventService from '../services/event'

const EventForm = () => {
    const [team, setTeam] = useState('')
    const [opponent, setOpponent] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')

    const handleEvent = async (event) => {
        event.preventDefault()
        try {
            await eventService.addEvent({
                team, opponent, location, date, time, description
            })
            resetFields()
        } catch (exception) {
            const syote = `Joukkue: ${team} Vastustaja: ${opponent} Paikka ${location} Päivä: ${date} Aika: ${time} Kuvaus: ${description}`
            alert(syote)
            resetFields()
        }
    }

    const resetFields = () => {
        setTeam('Valitse joukkue')
        setOpponent('')
        setLocation('')
        setDate('')
        setTime('')
        setDescription('')
    }

    const teams = [
        { name: 'Joukkue 1', id: '1' },
        { name: 'Joukkue 2', id: '2' },
        { name: 'Joukkue 3', id: '3' }
    ]

    const handleTeamChange = (e) => {
        setTeam(e.target.value)
    }

    useEffect(() => {
    }, [])


    return (
        <div>
            <h1>Lisää tapahtuma</h1>
            <form>
                <div>
                    <label>Joukkue</label>
                    <select id='team' onChange={handleTeamChange}>
                        <option value='Valitse joukkue'>Valitse joukkue</option>
                        {teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Vastustaja</label>
                    <input id='opponent' type='text' value={opponent}
                        onChange={({ target }) => {
                            setOpponent(target.value)
                        }}/>
                </div>
                <div>
                    <label>Paikka</label>
                    <input id='location' type='text' value={location}
                        onChange={({ target }) => {
                            setLocation(target.value)
                        }}/>
                </div>
                <div>
                    <label>Päivämäärä</label>
                    <input id='date' type='date' value={date}
                        onChange={({ target }) => {
                            setDate(target.value)
                        }}/>
                </div>
                <div>
                    <label>Kellonaika</label>
                    <input id='time' type='time' value={time}
                        onChange={({ target }) => {
                            setTime(target.value)
                        }}/>
                </div>
                <div>
                    <label>Lisätietoja</label>
                    <input id='description' type='text' value={description}
                        onChange={({ target }) => {
                            setDescription(target.value)
                        }}/>
                </div>
                <div>
                    <button id='add-event' onClick={handleEvent}>Lisää tapahtuma</button>
                </div>
                <div>
                    <button id='reset' onClick={resetFields}>Tyhjennä tiedot</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm