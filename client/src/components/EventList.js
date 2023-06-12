import { useState, useEffect } from 'react'
import EventDetails from './EventDetails'
import eventService from '../services/event'


const EventList = () => {

    const [showFilters, setShowFilters] = useState('+')
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


    useEffect(() => {

        eventService.getEvents().then(initialEvents =>

        {setGetEvents(initialEvents), setAllEvents(initialEvents)})


    }, [])

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

    const handleshowFilters = (event) => {
        event.preventDefault()
        if (showFilters === '-') {
            setShowFilters('+')
        } else {
            setShowFilters('-')
        }
    }
    const handleShowUnconfirmed = (event) => {
        event.preventDefault()
        if (unconfirmedClicked){
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
        if (confirmedClicked){
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
        if (allClicked){
            setAllClicked(false)
        }else{
            setAllClicked(true)
            setStatus('')
            setConfirmedClicked(false)
            setUnconfirmedClicked(false)
        }
    }

    const ShowFilters = () => {
        if (showFilters === '-') {
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

    const ShowUnconfirmed = () => {
        if (unconfirmedClicked) {
            return (
                <div>
                    <div className='flex justify-center items-center'>
                        <button className="bg-rose-400 ring-2 ring-rose-600 px-5 py-2 m-2 text-sm rounded-full font-semibold text-white" onClick={handleShowUnconfirmed} disabled={unconfirmedClicked}>Odottaa hyväksyntää</button>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-emerald-200" onClick={handleShowConfirmed}>Hyväksytyt tapahtumat</button>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-gray-200" onClick={handleAllClicked}>Kaikki tapahtumat</button>
                        <button className="text-gray-600 font-semibold hover:text-gray py-1 px-2 m-2 border border-gray-500 hover:border-teal-500 rounded" onClick={handleshowFilters}>{showFilters}</button>
                    </div>
                    <div>
                        < ShowFilters />
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                            <table id='events' className='text-left text-xs bg-stone-100'>
                                <thead>
                                    <tr>
                                        <th className='p-4' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                                        <th className='p-4' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                                        <th className='p-4' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                                        <th className='p-4' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showEvents.map((one_event, index) =>
                                        <tr className={`${ index % 2 === 0 ? 'bg-white' : 'bg-stone-100'} border hover:bg-gray-300 text-gray-600 text-center`} key={one_event.id} onClick={(event) => handleClick(event, one_event)}>
                                            <td className='p-4'>{getDate(one_event.dateTime)}</td>
                                            <td className='p-4'>{one_event.location}</td>
                                            <td className='p-4'>{one_event.team}</td>
                                            <td className='p-4 text-rose-400'>Odottaa hyväksyntää</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
    const ShowConfirmed = () => {
        if (confirmedClicked) {
            return (
                <div>
                    <div className='flex justify-center items-center'>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-rose-200"  onClick={handleShowUnconfirmed}>Odottaa hyväksyntää</button>
                        <button className="bg-emerald-400 ring-2 ring-emerald-600 px-5 py-2 m-2 text-sm rounded-full font-semibold text-white" onClick={handleShowConfirmed} disabled={confirmedClicked}>Hyväksytyt tapahtumat</button>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-gray-200" onClick={handleAllClicked}>Kaikki tapahtumat</button>
                        <button className="text-gray-600 font-semibold hover:text-gray py-1 px-4 m-2 border border-gray-500 hover:border-teal-500 rounded" onClick={handleshowFilters}>{showFilters}</button>
                    </div>
                    <div>
                        < ShowFilters/>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                            <table id='events' className='text-left text-xs bg-stone-100'>
                                <thead>
                                    <tr>
                                        <th className='p-4' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                                        <th className='p-4' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                                        <th className='p-4' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                                        <th className='p-4' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showEvents.map((one_event, index) =>
                                        <tr className={`${ index % 2 === 0 ? 'bg-white' : 'bg-stone-100'}  border hover:bg-gray-300 text-gray-600 text-center`} key={one_event.id} onClick={(event) => handleClick(event, one_event)}>
                                            <td className='p-4'>{getDate(one_event.dateTime)}</td>
                                            <td className='p-4'>{one_event.location}</td>
                                            <td className='p-4'>{one_event.team}</td>
                                            <td className='p-4 text-emerald-400'>Hyväksytty</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const ShowAll = () => {
        if (allClicked) {
            return (
                <div>
                    <div>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-rose-200"  onClick={handleShowUnconfirmed}>Odottaa hyväksyntää</button>
                        <button className="ring-1 ring-gray-200 px-5 py-2 m-2 rounded-full text-gray-600 hover:bg-emerald-200" onClick={handleShowConfirmed}>Hyväksytty</button>
                        <button className="bg-gray-900 ring-2 ring-gray-600 px-5 py-2 m-2 text-sm rounded-full font-semibold text-white" onClick={handleAllClicked} disabled={allClicked}>Kaikki tapahtumat</button>
                        <button className="text-gray-600 font-semibold hover:text-gray py-1 px-4 border border-gray-500 hover:border-teal-500 rounded" onClick={handleshowFilters}>{showFilters}</button>
                    </div>
                    < ShowFilters />
                    <div>
                        <table id='events' className='border-separate border-spacing-y-2 rounded-lg'>
                            <thead>
                                <tr>
                                    <th className='text-left p-4' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                                    <th className='text-left p-4' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                                    <th className='text-left p-4' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                                    <th className='text-left p-4' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showEvents.map((one_event) =>
                                    <tr className={`rounded ring-1 ring-gray-700 ring-opacity-50 text-sm text-gray-600 text-center ${one_event.status === '0' ? 'bg-rose-100 hover:ring hover:ring-rose-500 hover:bg-rose-400' : 'bg-emerald-100 hover:ring hover:ring-emerald-500 hover:bg-emerald-400'}`} key={one_event.id} onClick={(event) => handleClick(event, one_event)}>
                                        <td className='py-4'>{getDate(one_event.dateTime)}</td>
                                        <td className='py-4'>{one_event.location}</td>
                                        <td className='py-4'>{one_event.team}</td>
                                        <td className='p-2'>{one_event.status === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(getEvents)))
        setAllEvents(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])

    return (
        <div className='flex justify-center bg-stone-100 p-4'>
            <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3 divide-y'>
                <h2 className='font-bold text-2xl text-center text-teal-500'>Tapahtumat</h2>
                <div className="text-xs p-4">
                    <div>
                        < ShowUnconfirmed />
                        < ShowConfirmed />
                        < ShowAll />
                    </div>
                </div>
                {clickedEvent !== '' && <EventDetails one_event={clickedEvent} />}

            </div>
        </div>
    )
}

export default EventList