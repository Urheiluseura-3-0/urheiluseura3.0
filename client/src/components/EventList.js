import { useState, useEffect } from 'react'
import EventDetails from './EventDetails'
import eventService from '../services/event'
import Notification from './Notification'


const EventList = () => {

    const [showFilters, setShowFilters] = useState('Valitse aikaväli')
    const [unconfirmedClicked, setUnconfirmedClicked] = useState(true)
    const [confirmedClicked, setConfirmedClicked] = useState(false)
    const [allClicked, setAllClicked] = useState(false)

    const [selectedStatus, setStatus] = useState('0')

    const [selectedDateFrom, setDateFrom] = useState('')
    const [selectedDateTo, setDateTo] = useState('')
    const [clickedEvent, setClickedEvent] = useState('')

    const [sortedByTeam, setSortedByTeam] = useState('')
    const [sortedByLocation, setSortedByLocation] = useState('')
    const [sortedByDate, setSortedByDate] = useState('')
    const [sortedByStatus, setSortedByStatus] = useState('')
    const [allEvents, setAllEvents] = useState([])
    const [shownEvents, setShownEvents] = useState(allEvents)

    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const day = formattedDate.getDate().toString().padStart(2, '0')
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
        const year = formattedDate.getFullYear()

        return `${day}.${month}.${year}`
    }

    useEffect(() => {
        eventService.getEvents().then(initialEvents => {
            setAllEvents(initialEvents)

            const currentDate = new Date()
            const threeMonthsAgo = new Date()
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

            setDateFrom(threeMonthsAgo.toISOString().split('T')[0])
            setDateTo(currentDate.toISOString().split('T')[0])
        })

    }, [])

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(allEvents)))
        setShownEvents(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])

    const sortByTeam = (event) => {
        event.preventDefault()
        setSortedByDate('')
        setSortedByLocation('')
        setSortedByStatus('')
        const sorted = [...shownEvents]
        sorted.sort((a, b) => {
            const teamA = a.EventTeam.name.toLowerCase()
            const teamB = b.EventTeam.name.toLowerCase()

            if (teamA > teamB) {
                return 1
            } else if (teamA < teamB) {
                return -1
            } else {
                return 0
            }
        })


        if (sortedByTeam === 'asc') {
            setSortedByTeam('desc')
            setShownEvents([...sorted].reverse())
        } else {
            setSortedByTeam('asc')
            setShownEvents(sorted)
        }

    }

    const sortByDate = (event) => {
        event.preventDefault()
        setSortedByLocation('')
        setSortedByTeam('')
        setSortedByStatus('')

        const sorted = [...shownEvents]
        sorted.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime()
            const dateB = new Date(b.dateTime).getTime()
            return dateA - dateB
        })
        if (sortedByDate === 'asc') {
            setSortedByDate('desc')
            setShownEvents(sorted)
        } else {
            setSortedByDate('asc')
            setShownEvents([...sorted].reverse())
        }
    }

    const sortByLocation = (event) => {
        event.preventDefault()
        setSortedByDate('')
        setSortedByTeam('')
        setSortedByStatus('')
        const sorted = [...shownEvents]
        sorted.sort((a, b) => {
            const locationA = a.location.toLowerCase()
            const locationB = b.location.toLowerCase()

            if (locationA > locationB) {
                return 1
            } else if (locationA < locationB) {
                return -1
            } else {
                return 0
            }
        })

        if (sortedByLocation === 'asc') {
            setShownEvents([...sorted].reverse())
            setSortedByLocation('desc')
        } else {
            setShownEvents(sorted)
            setSortedByLocation('asc')
        }
    }

    const sortByStatus = (event) => {
        event.preventDefault()
        setSortedByDate('')
        setSortedByTeam('')
        setSortedByLocation('')
        const sorted = [...shownEvents]
        sorted.sort((a, b) => {
            const statusA = a.status
            const statusB = b.status
            return statusA - statusB
        })

        if (sortedByStatus === 'confirmedFirst') {
            setShownEvents([...sorted].reverse())
            setSortedByStatus('unconfirmedFirst')
        } else {
            setShownEvents(sorted)
            setSortedByStatus('confirmedFirst')
        }
    }

    const getDate = (datetime) => {
        const date = new Date(datetime)
        return date.toLocaleDateString()
    }

    const handleClick = (event, one_event) => {
        event.preventDefault()
        clickedEvent.id === one_event.id ? setClickedEvent('') : setClickedEvent(one_event)
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
        const formattedSelectedDateFrom = new Date(selectedDateFrom)
        const formattedSelectedDateTo = new Date(selectedDateTo)

        if (formattedSelectedDateFrom > formattedSelectedDateTo) {
            setShowAlert(true)
            setAlertMessage('Viallinen aikaväli.')
        } else {
            setShowAlert(false)
            setAlertMessage('')
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
            setClickedEvent('')
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
            setClickedEvent('')
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
            setClickedEvent('')
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
                            setClickedEvent('')
                        }}></input>
                    </div>
                    <div>
                        <label className="block mt-2">Tapahtumat asti</label>
                        <input className='border rounded m-2 border-gray-300' type='date' id='dateto' value={selectedDateTo} onChange={({ target }) => {
                            setDateTo(target.value)
                            setClickedEvent('')
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
                    <span>Ottelut aikaväliltä {formatDate(selectedDateFrom)} - {formatDate(selectedDateTo)}</span>
                    <button className="text-gray-600 font-semibold hover:text-gray py-1 px-2 m-2 border border-gray-500 hover:border-teal-500 rounded" onClick={handleshowFilters}>{showFilters}</button>
                    < ShowFilters />
                </div>
                <div className='flex justify-center items-center mt-4'>
                    <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                        <table id='events' className='text-center text-xs bg-stone-100'>
                            <thead>
                                <tr>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='date' onClick={(event) => sortByDate(event)}>Päivä</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='location' onClick={(event) => sortByLocation(event)}>Paikka</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='team' onClick={(event) => sortByTeam(event)}>Joukkue</th>
                                    <th className='p-4 cursor-pointer hover:bg-gray-300' id='status' onClick={(event) => sortByStatus(event)}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shownEvents.map((one_event, index) =>
                                    <tr className={`${one_event.id === clickedEvent.id ? 'bg-gray-400' : index % 2 === 0 ? 'bg-white' : 'bg-stone-100'} border hover:bg-gray-300 text-center cursor-pointer`} key={one_event.id} onClick={(event) => handleClick(event, one_event)}>
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
                {showAlert && <Notification message={alertMessage} />}
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