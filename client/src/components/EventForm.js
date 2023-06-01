import { useState } from 'react'

const EventForm = () => {
    const [team, setTeam] = useState('')
    const [opponent, setOpponent] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div>
            <h1>Lisää tapahtuma</h1>
            <form>
                <div>
                    <label>Joukkue </label>
                    <input id='team' type='text' value={team}
                        onChange={({ target }) => {
                            setTeam(target.value)
                        }}/>
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
                    <button id='add-event' type='submit'>Lisää tapahtuma</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm