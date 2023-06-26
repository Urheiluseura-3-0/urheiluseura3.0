import { useState, useEffect } from 'react'
import jobService from '../services/job'
import Notification from './Notification'
import DateFilters from './DateFilters'
import ViewButtons from './ViewButtons'
import ViewTable from './ViewTable'
import { getLocalizedDate } from '../utils/listUtils'

const JobList = () => {
    const [showDateFilters, setShowDateFilters] = useState('Valitse aikaväli')

    const [viewSelected, setViewSelected] = useState('unconfirmed')

    const [selectedStatus, setStatus] = useState('0')
    const [selectedDateFrom, setDateFrom] = useState('')
    const [selectedDateTo, setDateTo] = useState('')

    const [sortedBySquad, setSortedBySquad] = useState('')
    const [sortedByLocation, setSortedByLocation] = useState('')
    const [sortedByDate, setSortedByDate] = useState('')
    const [sortedByStatus, setSortedByStatus] = useState('')

    const [allJobs, setAllJobs] = useState([])
    const [shownJobs, setShownJobs] = useState(allJobs)
    const [clickedJob, setClickedJob] = useState('')

    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        jobService.getJobs().then(initialJobs => {
            const sortedJobs = initialJobs.sort((a, b) => {
                const dateA = new Date(a.dateTime).getTime()
                const dateB = new Date(b.dateTime).getTime()
                return dateB - dateA
            })
            setAllJobs(sortedJobs)

            const currentDate = new Date()
            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(currentDate.getMonth() - 1)

            setDateFrom(oneMonthAgo.toISOString().split('T')[0])
            setDateTo(currentDate.toISOString().split('T')[0])
        })

    }, [])

    useEffect(() => {
        const filtered = filterByDateFrom(filterByDateTo(filterByStatus(allJobs)))
        setShownJobs(filtered)
    }, [selectedStatus, selectedDateFrom, selectedDateTo])


    //Sorter functions for columns

    const sortBySquad = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedByLocation('')
        setSortedByStatus('')

        const sorted = [...shownJobs]
        sorted.sort((a, b) => {
            const teamA = a.squad.toLowerCase()
            const teamB = b.squad.toLowerCase()
            if (teamA > teamB) {
                return 1
            } else if (teamA < teamB) {
                return -1
            } else {
                return 0
            }
        })


        if (sortedBySquad === 'asc') {
            setSortedBySquad('desc')
            setShownJobs([...sorted].reverse())
        } else {
            setSortedBySquad('asc')
            setShownJobs(sorted)
        }

    }

    const sortByDate = (event) => {
        event.preventDefault()

        setSortedByLocation('')
        setSortedBySquad('')
        setSortedByStatus('')

        const sorted = [...shownJobs]
        sorted.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime()
            const dateB = new Date(b.dateTime).getTime()
            return dateA - dateB
        })

        if (sortedByDate === 'asc') {
            setSortedByDate('desc')
            setShownJobs(sorted)
        } else {
            setSortedByDate('asc')
            setShownJobs([...sorted].reverse())
        }
    }

    const sortByLocation = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedBySquad('')
        setSortedByStatus('')

        const sorted = [...shownJobs]
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
            setShownJobs([...sorted].reverse())
            setSortedByLocation('desc')
        } else {
            setShownJobs(sorted)
            setSortedByLocation('asc')
        }
    }

    const sortByStatus = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedBySquad('')
        setSortedByLocation('')

        const sorted = [...shownJobs]
        sorted.sort((a, b) => {
            const statusA = a.status
            const statusB = b.status
            return statusA - statusB
        })

        if (sortedByStatus === 'confirmedFirst') {
            setShownJobs([...sorted].reverse())
            setSortedByStatus('unconfirmedFirst')
        } else {
            setShownJobs(sorted)
            setSortedByStatus('confirmedFirst')
        }
    }

    const sortByHours = (event) => {
        event.preventDefault()

        console.log('Sort Hours')
        return
    }


    //Filters for what jobs are shown

    const filterByStatus = (filtered) => {
        if (selectedStatus === '') {
            return filtered
        }
        const filteredJobs = filtered.filter((oneJob) => {
            return oneJob.status === Number(selectedStatus)
        })

        return filteredJobs
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
        const filteredJobs = filtered.filter((oneJob) => {
            return oneJob.dateTime.substring(0, 10) >= selectedDateFrom
        })
        return filteredJobs
    }

    const filterByDateTo = (filtered) => {
        if (selectedDateTo === '') {
            return filtered
        }

        const filteredJobs = filtered.filter((oneJob) => {
            return oneJob.dateTime.substring(0, 10) <= selectedDateTo
        })
        return filteredJobs
    }


    //Event handlers

    const handleEventClick = (event, oneJob) => {
        event.preventDefault()
        clickedJob.id === oneJob.id ? setClickedJob('') : setClickedJob(oneJob)
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
        setClickedJob('')
        resetSorters()
    }

    const handleDateFromChange = (event) => {
        event.preventDefault()

        const value = event.target.value
        setDateFrom(value)
        setClickedJob('')
        resetSorters()
    }

    const handleDateToChange = (event) => {
        event.preventDefault()

        const value = event.target.value
        setDateTo(value)
        setClickedJob('')
        resetSorters()
    }



    const resetSorters = () => {
        setSortedByDate('')
        setSortedByLocation('')
        setSortedByStatus('')
        setSortedBySquad('')
    }

    const jobColumns = [
        {
            id: 'date',
            text: 'Päivä',
            sort: sortByDate,
            render: (job) => getLocalizedDate(job.dateTime),
        },
        {
            id: 'location',
            text: 'Paikka',
            sort: sortByLocation,
            render: (job) => job.location,
        },
        {
            id: 'squad',
            text: 'Ryhmä',
            sort: sortBySquad,
            render: (job) => job.squad,
        },
        {
            id: 'hours',
            text: 'Tunnit',
            sort: sortByHours,
            render: (job) => job.hours,
        },
        {
            id: 'status',
            text: 'Status',
            sort: sortByStatus,
            render: (job) => (
                <span
                    className={
                        String(job.status) === '0' ? 'text-rose-400' : 'text-emerald-400'
                    }
                >
                    {String(job.status) === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}
                </span>
            )
        },
    ]

    return (
        <div className='p-6 bg-white rounded-xl shadow-lg space-y-3 divide-y'>
            <h2 className='font-bold text-2xl text-center text-teal-500'>Työtunnit</h2>
            {showAlert && <Notification message={alertMessage} />}
            <div className="text-xs p-4">
                < ViewButtons
                    name='Jobs'
                    nameForUI='Työtunnit'
                    viewSelected={viewSelected}
                    handleViewSelected={handleViewSelected}
                />
                < DateFilters
                    nameForUI='Työtunnit'
                    showFilters={showDateFilters}
                    selectedDateFrom={selectedDateFrom}
                    selectedDateTo={selectedDateTo}
                    handleDateFromChange={handleDateFromChange}
                    handleDateToChange={handleDateToChange}
                    handleShowDateFilters={handleShowDateFilters}
                    showDateFilters={showDateFilters}
                />
                < ViewTable
                    name='jobs'
                    columns={jobColumns}
                    shownItems={shownJobs}
                    clickedItem={clickedJob}
                    handleItemClick={handleEventClick}
                />
            </div>
            {clickedJob !== '' && console.log(clickedJob)}
        </div>
    )
}

export default JobList