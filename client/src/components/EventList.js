import { useState, useEffect } from 'react'

const EventList = () => {

    const [status, setStatus] = useState('')
    const [clicked, setClicked] = useState('')

    const events = [
        { id: '1', team: 'Joukkue 1', opponent: 'Vierasjoukkue', location: 'Espoo',
            dateTime: '2023-05-23T18:00', description: 'Kuvaus', status: '0' },
        { id: '2', team: 'Joukkue 2', opponent: 'Vierasjoukkue', location: 'Vantaa',
            dateTime: '2023-06-10T16:30', description: '', status: '1' },
        { id: '3', team: 'Joukkue 1', opponent: 'Vierasjoukkue 2', location: 'Kerava',
            dateTime: '2023-07-01T10:15', description: 'Lipunmyynti', status: '0' },
        { id: '4', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Helsinki',
            dateTime: '2023-08-01T12:00', description: 'Lipunmyynti', status: '1' },
        { id: '5', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Kerava',
            dateTime: '2023-07-13T10:15', description: 'Tuomarointi', status: '0' },
        { id: '6', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Helsinki',
            dateTime: '2023-08-12T12:00', description: '', status: '1' },
    ]

    const getDate = (datetime) => {
        let date = new Date(datetime)
        return date.toLocaleDateString()
    }

    const handleClick = (one_event, event) => {
        event.preventDefault()
        clicked.id === one_event.id ? setClicked('') : setClicked(one_event)
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <h2>Lisätyt tapahtumat</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Joukkue</th>
                        <th>Vastustaja</th>
                        <th>Paikka</th>
                        <th>Päivä</th>
                        <th><select onChange={({ target }) => {
                            setStatus(target.value)
                            console.log(status)
                        }}>
                            <option value=''>Status</option>
                            <option value='1'>Hyväksytty</option>
                            <option value='0'>Odottaa hyväksyntää</option>
                        </select></th>
                    </tr>
                    { status === '' ?
                        events.map((one_event) =>
                            <tr key = {one_event.id} onClick={(event) => handleClick(one_event, event)}>
                                <td>{one_event.team}</td>
                                <td>{one_event.opponent}</td>
                                <td>{one_event.location}</td>
                                <td>{getDate(one_event.dateTime)}</td>
                                <td>{one_event.status === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                            </tr>) :
                        events.filter(one_event => one_event.status === status).map(filteredEvent => (
                            <tr key = {filteredEvent.id} onClick={handleClick}>
                                <td>{filteredEvent.team}</td>
                                <td>{filteredEvent.opponent}</td>
                                <td>{filteredEvent.location}</td>
                                <td>{getDate(filteredEvent.dateTime)}</td>
                                <td>{filteredEvent.status === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                            </tr>
                        ))}
                </tbody>
            </table>


        </div>
    )
}

export default EventList