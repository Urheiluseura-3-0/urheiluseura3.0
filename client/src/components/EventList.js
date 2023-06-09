import { useState, useEffect } from 'react'
import EventDetails from './EventDetails'

const EventList = () => {

    const getEvents = [
        { id: '1', team: 'Joukkue 1', opponent: 'Vierasjoukkue', location: 'Espoo',
            dateTime: '2023-06-23T18:00', description: 'Kuvaus', status: '0' },
        { id: '2', team: 'Joukkue 3', opponent: 'Vierasjoukkue', location: 'Vantaa',
            dateTime: '2023-05-10T16:30', description: '', status: '1' },
        { id: '3', team: 'Joukkue 1', opponent: 'Vierasjoukkue 2', location: 'Kerava',
            dateTime: '2023-06-02T10:15', description: 'Lipunmyynti', status: '0' },
        { id: '4', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Helsinki',
            dateTime: '2023-05-02T12:00', description: 'Lipunmyynti', status: '1' },
        { id: '5', team: 'Joukkue 3', opponent: 'Vierasjoukkue 3', location: 'Kerava',
            dateTime: '2023-06-13T10:15', description: 'Tuomarointi', status: '0' },
        { id: '6', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Helsinki',
            dateTime: '2023-06-12T12:00', description: '', status: '1' },
        { id: '7', team: 'Joukkue 2', opponent: 'Vierasjoukkue', location: 'Vantaa',
            dateTime: '2023-05-10T16:30', description: '', status: '1' },
        { id: '8', team: 'Joukkue 1', opponent: 'Vierasjoukkue 2', location: 'Kerava',
            dateTime: '2023-06-02T10:15', description: 'Lipunmyynti', status: '0' },
        { id: '9', team: 'Joukkue 3', opponent: 'Vierasjoukkue 3', location: 'Helsinki',
            dateTime: '2023-06-02T12:00', description: 'Lipunmyynti', status: '1' },
        { id: '10', team: 'Joukkue 3', opponent: 'Vierasjoukkue 4', location: 'Kerava',
            dateTime: '2023-05-13T10:15', description: 'Tuomarointi', status: '0' },
        { id: '11', team: 'Joukkue 3', opponent: 'Vierasjoukkue 2', location: 'Helsinki',
            dateTime: '2023-06-12T12:00', description: '', status: '1' },
    ]

    const [showEvents, setAllEvents] = useState(getEvents)

    const [selectedStatus, setStatus] = useState('')
    const [selectedDateFrom, setDateFrom] = useState('')
    const [selectedDateTo, setDateTo] = useState('')
    const [clickedEvent, setClicked] = useState('')

    const [sortedByTeam, setSortedByTeam] = useState('1')
    const [sortedByOpponent, setSortedByOpponent] = useState('1')
    const [sortedByLocation, setSortedByLocation] = useState('1')
    const [sortedByDate, setSortedByDate] = useState('1')
    const [sortedByStatus, setSortedByStatus] = useState('1')

    const sortByTeam = (event) => {
        event.preventDefault()

        const sorted = showEvents.sort((a, b) => {
            const teamA = a.team
            const teamB = b.team

            if (teamA > teamB) {
                return 1
            } else if (teamA < teamB) {
                return -1
            } else {
                return 0
            }
        })

        setClicked('')

        if (sortedByTeam === '1') {
            setSortedByTeam('0')
            return sorted
        } else {
            setSortedByTeam('1')
            return sorted.reverse()
        }

    }

    const sortByOpponent = (event) => {
        event.preventDefault()

        const sorted = showEvents.sort((a, b) => {
            const opponentA = a.opponent
            const opponentB = b.opponent

            if (opponentA > opponentB) {
                return 1
            } else if (opponentA < opponentB) {
                return -1
            } else {
                return 0
            }
        })

        if (sortedByOpponent === '1') {
            setAllEvents(sorted)
            setSortedByOpponent('0')
        } else {
            setAllEvents(sorted.reverse())
            setSortedByOpponent('1')
        }
        setClicked('')
    }

    const sortByDate = (event) => {
        event.preventDefault()

        const sorted = showEvents.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime()
            const dateB = new Date(b.dateTime).getTime()
            return dateA - dateB
        })

        if (sortedByDate === '1') {
            setAllEvents(sorted)
            setSortedByDate('0')
        } else {
            setAllEvents(sorted.reverse())
            setSortedByDate('1')
        }
        setClicked('')
    }

    const sortByLocation = (event) => {
        event.preventDefault()

        const sorted = showEvents.sort((a, b) => {
            const locationA = a.location
            const locationB = b.location

            if (locationA > locationB) {
                return 1
            } else if (locationA < locationB) {
                return -1
            } else {
                return 0
            }
        })

        if (sortedByLocation === '1') {
            setAllEvents(sorted)
            setSortedByLocation('0')
        } else {
            setAllEvents(sorted.reverse())
            setSortedByLocation('1')
        }
        setClicked('')
    }

    const sortByStatus = (event) => {
        event.preventDefault()
        const sorted = showEvents.sort((a, b) => {
            const statusA = a.status
            const statusB = b.status
            return statusA - statusB
        })

        if (sortedByStatus === '1') {
            setAllEvents(sorted)
            setSortedByStatus('0')
        } else {
            setAllEvents(sorted.reverse())
            setSortedByStatus('1')
        }
        setClicked('')
    }

    const getDate = (datetime) => {
        const date = new Date(datetime)
        return date.toLocaleDateString()
    }

    const handleClick = (event, one_event) => {
        event.preventDefault()
        clickedEvent.id === one_event.id ? setClicked('') : setClicked(one_event)
    }

    const filterByStatus = (filtered) => {
        if (selectedStatus === '') {
            return filtered
        }

        const filteredEvents = filtered.filter((one_event) => one_event.status === selectedStatus)
        return filteredEvents
    }

    const filterByDateFrom = (filtered) => {
        if (selectedDateFrom === '') {
            return filtered
        }

        const filteredEvents = filtered.filter((one_event) => {
            return one_event.dateTime.substring(0, 10) >= selectedDateFrom
        })
        return filteredEvents
    }

    const filterByDateTo = (filtered) => {
        if (selectedDateTo === '') {
            return filtered
        }

        const filteredEvents = filtered.filter((one_event) => {
            return one_event.dateTime.substring(0, 10) <= selectedDateTo
        })
        return filteredEvents
    }

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(getEvents)))
        setAllEvents(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])

    return (
        <div className='flex justify-center bg-stone-100 p-4'>
            <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3 divide-y'>
                <h2 className='font-bold text-2xl text-center text-teal-500'>Tapahtumat</h2>
                <div className="space-y-3 text-xs">
                    <div>
                        <label className="block">Tapahtumat alkaen</label>
                        <input className='border rounded p-2 border-gray-300' type='date' id='datefrom' value={selectedDateFrom} onChange={({ target }) => {
                            setDateFrom(target.value)
                            setClicked('')
                        }}></input>
                    </div>
                    <div>
                        <label className="block">Tapahtumat asti</label>
                        <input className='border rounded p-2 border-gray-300' type='date' id='dateto' value={selectedDateTo} onChange={({ target }) => {
                            setDateTo(target.value)
                            setClicked('')
                        }}></input>
                    </div>
                    <div>
                        <label className="block">Status</label>
                        <select className='border rounded p-2 border-gray-300' onChange={({ target }) => {
                            setStatus(target.value)
                            setClicked('')
                        }}>
                            <option value=''>Kaikki</option>
                            <option value='1'>Hyväksytty</option>
                            <option value='0'>Odottaa hyväksyntää</option>
                        </select>
                    </div>
                </div>
                <table id='events' className='border-separate border-spacing-y-2'>
                    <thead>
                        <tr>
                            <th className='text-left p-4' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                            <th className='text-left p-4' id='opponent' onClick={(event) => sortByOpponent(event)}>Vastustaja</th>
                            <th className='text-left p-4' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                            <th className='text-left p-4' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                            <th className='text-left p-4' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showEvents.map((one_event) =>
                            <tr className="bg-white-300 rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring hover:ring-teal-200 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center" key = {one_event.id} onClick={(event) => handleClick(event, one_event)}>
                                <td className='py-4'>{one_event.team}</td>
                                <td className='py-4'>{one_event.opponent}</td>
                                <td className='py-4'>{one_event.location}</td>
                                <td className='py-4'>{getDate(one_event.dateTime)}</td>
                                <td className='p-2'>{one_event.status === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {clickedEvent !== '' && <EventDetails one_event={clickedEvent}/>}
            </div>
        </div>
    )
}

export default EventList