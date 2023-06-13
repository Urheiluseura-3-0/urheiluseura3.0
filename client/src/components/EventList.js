import { useState, useEffect } from 'react'
import EventDetails from './EventDetails'
import eventService from '../services/event'


const EventList = () => {

    const [showFilters, setShowFilters] = useState('Valitse aikaväli')
    const [unconfirmedClicked, setUnconfirmedClicked] = useState(true)
    const [confirmedClicked, setConfirmedClicked] = useState(false)
    const [allClicked, setAllClicked] = useState(false)

    const [selectedStatus, setStatus] = useState('0')

    const [selectedDateFrom, setDateFrom] = useState('')
    const [selectedDateTo, setDateTo] = useState('')
    const [clickedEvent, setClicked] = useState('')

    const [sortedByTeam, setSortedByTeam] = useState('1')
    //const [sortedByOpponent, setSortedByOpponent] = useState('1')
    const [sortedByLocation, setSortedByLocation] = useState('1')
    const [sortedByDate, setSortedByDate] = useState('1')
    const [sortedByStatus, setSortedByStatus] = useState('1')
    const [getEvents, setGetEvents] = useState([])
    const [showEvents, setAllEvents] = useState(getEvents)


    // const formatDate = (date) => {
    //     const day = date.getDate().toString().padStart(2, '0')
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0')
    //     const year = date.getFullYear()

    //     return `${day}-${month}-${year}`
    // }

    useEffect(() => {

        eventService.getEvents().then(initialEvents => {
            setGetEvents(initialEvents), setAllEvents(filterByStatus(initialEvents))
        })
        const currentDate = new Date()
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

        setDateFrom(threeMonthsAgo.toISOString().split('T')[0])
        setDateTo(currentDate.toISOString().split('T')[0])

    }, [])

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(getEvents)))
        setAllEvents(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])

    const sortByTeam = (event) => {
        event.preventDefault()

        const sorted = showEvents.sort((a, b) => {
            const teamA = a.EventTeam.name
            const teamB = b.EventTeam.name

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
    /*
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
 */
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
        const filteredEvents = filtered.filter((one_event) => {
            return one_event.status === Number(selectedStatus)
        })

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

    const handleshowFilters = (event) => {
        event.preventDefault()
        if (showFilters === 'Pienennä') {
            setShowFilters('Valitse aikaväli')
        } else {
            setShowFilters('Pienennä')
        }
    }
    const handleShowUnconfirmed = (event) => {
        event.preventDefault()
        if (unconfirmedClicked) {
            setUnconfirmedClicked(false)
        } else {
            setUnconfirmedClicked(true)
            setStatus('0')
            setConfirmedClicked(false)
            setAllClicked(false)
        }

    }

    const handleShowConfirmed = (event) => {
        event.preventDefault()
        if (confirmedClicked) {
            setConfirmedClicked(false)
        } else {
            setConfirmedClicked(true)
            setStatus('1')
            setUnconfirmedClicked(false)
            setAllClicked(false)
        }
    }

    const handleAllClicked = (event) => {
        event.preventDefault()
        if (allClicked) {
            setAllClicked(false)
        } else {
            setAllClicked(true)
            setStatus('')
            setConfirmedClicked(false)
            setUnconfirmedClicked(false)
        }
    }

    const ShowFilters = () => {
        if (showFilters === 'Pienennä') {
            return (
                <div className='flex justify px-5 py-2'>
                    <div>
                        <label className="block mt-2">Tapahtumat alkaen</label>
                        <input className='border rounded m-2 border-gray-300' type='date' id='datefrom' value={selectedDateFrom} onChange={({ target }) => {
                            setDateFrom(target.value)
                            setClicked('')
                        }}></input>
                    </div>
                    <div>
                        <label className="block mt-2">Tapahtumat asti</label>
                        <input className='border rounded m-2 border-gray-300' type='date' id='dateto' value={selectedDateTo} onChange={({ target }) => {
                            setDateTo(target.value)
                            setClicked('')
                        }}></input>
                    </div>
                </div>
            )
        }
    }

    const ListView = () => {
        return (
            <div>
                <div className='flex justify-center items-center'>
                    <button className={`${unconfirmedClicked ? 'bg-rose-400 ring-2 ring-rose-600 text-white font-semibold text-sm' :
                        'ring-1 ring-gray-200  text-gray-600 hover:bg-rose-200'} px-5 py-2 m-2 rounded-full`} onClick={handleShowUnconfirmed} disabled={unconfirmedClicked}>Odottaa hyväksyntää</button>
                    <button className={`${confirmedClicked ? 'bg-emerald-400 ring-2 ring-emerald-600 text-white font-semibold text-sm' :
                        'ring-1 ring-gray-200  text-gray-600 hover:bg-emerald-200'} px-5 py-2 m-2 rounded-full`} onClick={handleShowConfirmed} disabled={confirmedClicked}>Hyväksytyt tapahtumat</button>
                    <button className={`${allClicked ? 'bg-blue-400 ring-2 ring-blue-600 text-white font-semibold text-sm' :
                        'ring-1 ring-gray-200  text-gray-600 hover:bg-blue-200'} px-5 py-2 m-2 rounded-full`} onClick={handleAllClicked} disabled={allClicked}>Kaikki tapahtumat</button>
                </div>
                <div>
                    <span>Ottelut aikaväliltä {selectedDateFrom} - {selectedDateTo}</span>
                    <button className="text-gray-600 font-semibold hover:text-gray py-1 px-2 m-2 border border-gray-500 hover:border-teal-500 rounded" onClick={handleshowFilters}>{showFilters}</button>
                    < ShowFilters />
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                        <table id='events' className='text-left text-xs bg-stone-100'>
                            <thead>
                                <tr>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showEvents.map((one_event, index) =>
                                    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-stone-100'} ${clickedEvent.id === one_event.id ? 'bg-gray-300' : 'inherit'} border hover:bg-gray-300 text-center cursor-pointer`} key={one_event.id} onClick={(event) => handleClick(event, one_event)}>
                                        <td className='p-4'>{getDate(one_event.dateTime)}</td>
                                        <td className='p-4'>{one_event.location}</td>
                                        <td className='p-4'>{one_event.EventTeam.name}</td>
                                        <td className={`${String(one_event.status) === '0' ? 'text-rose-400' : 'text-emerald-400'} p-4`}>{String(one_event.status) === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex justify-center bg-stone-100 p-4'>
            <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3 divide-y'>
                <h2 className='font-bold text-2xl text-center text-teal-500'>Tapahtumat</h2>
                <div className="text-xs p-4">
                    <div>
                        < ListView />
                    </div>
                </div>
                {clickedEvent !== '' && <EventDetails one_event={clickedEvent} />}
            </div>
        </div>
    )
}

export default EventList