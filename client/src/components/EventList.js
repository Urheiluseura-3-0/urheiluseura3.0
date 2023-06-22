import { useState, useEffect } from 'react'
import EventDetails from './EventDetails'
import eventService from '../services/event'
import Notification from './Notification'
import DateFilters from './DateFilters'
import ViewButtons from './ViewButtons'
import ViewTable from './ViewTable'
import { getLocalizedDate } from '../utils/listUtils'


const EventList = () => {

    const [showDateFilters, setShowDateFilters] = useState('Valitse aikaväli')

    const [viewSelected, setViewSelected] = useState('unconfirmed')

    const [selectedStatus, setStatus] = useState('0')
    const [selectedDateFrom, setDateFrom] = useState('')
    const [selectedDateTo, setDateTo] = useState('')

    const [sortedByTeam, setSortedByTeam] = useState('')
    const [sortedByLocation, setSortedByLocation] = useState('')
    const [sortedByDate, setSortedByDate] = useState('')
    const [sortedByStatus, setSortedByStatus] = useState('')

    const [allEvents, setAllEvents] = useState([])
    const [shownEvents, setShownEvents] = useState(allEvents)
    const [clickedEvent, setClickedEvent] = useState('')

    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        eventService.getEvents().then(initialEvents => {
            const sortedEvents = initialEvents.sort((a, b) => {
                const dateA = new Date(a.dateTime).getTime()
                const dateB = new Date(b.dateTime).getTime()
                return dateB - dateA
            })
            setAllEvents(sortedEvents)

            const currentDate = new Date()
            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(currentDate.getMonth() - 1)

            setDateFrom(oneMonthAgo.toISOString().split('T')[0])
            setDateTo(currentDate.toISOString().split('T')[0])
        })

    }, [])

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(allEvents)))
        setShownEvents(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])


    //Sorter functions for columns

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


    //Filters for what events are shown

    const filterByStatus = (filtered) => {
        if (selectedStatus === '') {
            return filtered
        }
        const filteredEvents = filtered.filter((oneEvent) => {
            return oneEvent.status === Number(selectedStatus)
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
        const filteredEvents = filtered.filter((oneEvent) => {
            return oneEvent.dateTime.substring(0, 10) >= selectedDateFrom
        })
        return filteredEvents
    }

    const filterByDateTo = (filtered) => {
        if (selectedDateTo === '') {
            return filtered
        }

        const filteredEvents = filtered.filter((oneEvent) => {
            return oneEvent.dateTime.substring(0, 10) <= selectedDateTo
        })
        return filteredEvents
    }


    //Event handlers

    const handleEventClick = (event, oneEvent) => {
        event.preventDefault()
        clickedEvent.id === oneEvent.id ? setClickedEvent('') : setClickedEvent(oneEvent)
    }

    const handleShowDateFilters = (event) => {
        event.preventDefault()

        if (showDateFilters === 'Pienennä') {
            setShowDateFilters('Valitse aikaväli')
        } else {
            setShowDateFilters('Pienennä')
        }
    }

    const handleViewSelected = (selectedView) => {
        setViewSelected(selectedView)
        if (selectedView === 'unconfirmed') {
            setStatus('0')
        }
        else if (selectedView === 'confirmed') {
            setStatus('1')
        }
        else if (selectedView === 'all') {
            setStatus('')
        }
        setClickedEvent('')
        resetSorters()
    }

    const handleDateFromChange = (event) => {
        event.preventDefault()

        const value = event.target.value
        setDateFrom(value)
        setClickedEvent('')
        resetSorters()
    }

    const handleDateToChange = (event) => {
        event.preventDefault()

        const value = event.target.value
        setDateTo(value)
        setClickedEvent('')
        resetSorters()
    }



    const resetSorters = () => {
        setSortedByDate('')
        setSortedByLocation('')
        setSortedByStatus('')
        setSortedByTeam('')
    }

    const eventColumns = [
        {
            id: 'date',
            text: 'Päivä',
            sort: sortByDate,
            render: (event) => getLocalizedDate(event.dateTime),
        },
        {
            id: 'location',
            text: 'Paikka',
            sort: sortByLocation,
            render: (event) => event.location,
        },
        {
            id: 'team',
            text: 'Joukkue',
            sort: sortByTeam,
            render: (event) => event.EventTeam.name,
        },
        {
            id: 'status',
            text: 'Status',
            sort: sortByStatus,
            render: (event) => (
                <span
                    className={
                        String(event.status) === '0' ? 'text-rose-400' : 'text-emerald-400'
                    }
                >
                    {String(event.status) === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}
                </span>
            )
        },
    ]

    return (
        <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3 divide-y'>
            <h2 className='font-bold text-2xl text-center text-teal-500'>Tapahtumat</h2>
            {showAlert && <Notification message={alertMessage} />}
            <div className="text-xs p-4">
                < ViewButtons
                    name='Events'
                    nameForUI='Tapahtumat'
                    viewSelected={viewSelected}
                    handleViewSelected={handleViewSelected}
                />
                < DateFilters
                    nameForUI='Tapahtumat'
                    showFilters={showDateFilters}
                    selectedDateFrom={selectedDateFrom}
                    selectedDateTo={selectedDateTo}
                    handleDateFromChange={handleDateFromChange}
                    handleDateToChange={handleDateToChange}
                    handleShowDateFilters={handleShowDateFilters}
                    showDateFilters={showDateFilters}
                />
                < ViewTable
                    name='events'
                    columns={eventColumns}
                    shownItems={shownEvents}
                    clickedItem={clickedEvent}
                    handleItemClick={handleEventClick}
                />
            </div>
            {clickedEvent !== '' && <EventDetails oneEvent={clickedEvent} />}
        </div>
    )
}

export default EventList