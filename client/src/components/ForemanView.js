import { useState, useEffect } from 'react'
import jobService from '../services/job'
import JobDetail from './JobDetail'
import ViewTable from './ViewTable'
import { getLocalizedDate } from '../utils/listUtils'

const ForemanView = () => {
    const [unconfirmedJobs, setUnconfirmedJobs] = useState([])
    const [clickedUnconfirmed, setClickedUnconfirmed] = useState('')

    const [sortedBySquad, setSortedBySquad] = useState('')
    const [sortedByDate, setSortedByDate] = useState('')
    const [sortedByStatus, setSortedByStatus] = useState('')
    const [sortedByHours, setSortedByHours] = useState('')


    useEffect(() => {
        jobService.getUnconfirmedJobs().then(allUnconfirmed => {
            setUnconfirmedJobs(allUnconfirmed)
        })
    }, [])

    const sortBySquad = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedByStatus('')
        setSortedByHours('')

        const sorted = [...unconfirmedJobs]
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
            setUnconfirmedJobs([...sorted].reverse())
        } else {
            setSortedBySquad('asc')
            setUnconfirmedJobs(sorted)
        }

    }

    const sortByDate = (event) => {
        event.preventDefault()

        setSortedBySquad('')
        setSortedByStatus('')
        setSortedByHours('')

        const sorted = [...unconfirmedJobs]
        sorted.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime()
            const dateB = new Date(b.dateTime).getTime()
            return dateA - dateB
        })

        if (sortedByDate === 'asc') {
            setSortedByDate('desc')
            setUnconfirmedJobs(sorted)
        } else {
            setSortedByDate('asc')
            setUnconfirmedJobs([...sorted].reverse())
        }
    }

    const sortByFirstname = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedBySquad('')
        setSortedByHours('')

        const sorted = [...unconfirmedJobs]
        sorted.sort((a, b) => {
            const nameA = a.CreatedBy.firstName.toLowerCase()
            const nameB = b.CreatedBy.firstName.toLowerCase()
            if (nameA > nameB) {
                return 1
            } else if (nameA < nameB) {
                return -1
            } else {
                return 0
            }
        })

        if (sortedByStatus === 'confirmedFirst') {
            setUnconfirmedJobs([...sorted].reverse())
            setSortedByStatus('unconfirmedFirst')
        } else {
            setUnconfirmedJobs(sorted)
            setSortedByStatus('confirmedFirst')
        }
    }

    const sortByHours = (event) => {
        event.preventDefault()

        setSortedByDate('')
        setSortedBySquad('')
        setSortedByStatus('')

        const sorted = [...unconfirmedJobs]
        sorted.sort((a, b) => {
            const hoursA = a.hours
            const hoursB = b.hours
            if (hoursA > hoursB) {
                return 1
            } else if (hoursA < hoursB) {
                return -1
            } else {
                return 0
            }
        })


        if (sortedByHours === 'asc') {
            setSortedByHours('desc')
            setUnconfirmedJobs([...sorted].reverse())
        } else {
            setSortedByHours('asc')
            setUnconfirmedJobs(sorted)
        }
    }

    const handleEventClick = (event, oneJob) => {
        event.preventDefault()
        clickedUnconfirmed.id === oneJob.id ? setClickedUnconfirmed('') : setClickedUnconfirmed(oneJob)
    }


    const jobColumns = [
        {
            id: 'date',
            text: 'Päivä',
            sort: sortByDate,
            render: (job) => getLocalizedDate(job.dateTime),
        },
        {
            id: 'hours',
            text: 'Tunnit',
            sort: sortByHours,
            render: (job) => {
                const hours = Math.floor(job.hours)
                const minutes = Math.round((job.hours - hours) * 60)
                return `${hours}h ${minutes}min`
            },
        },
        {
            id: 'squad',
            text: 'Ryhmä',
            sort: sortBySquad,
            render: (job) => job.squad,
        },
        {
            id: 'createdBy',
            text: 'Tekijä',
            sort: sortByFirstname,
            render: (job) => {
                return `${job.CreatedBy.firstName} ${job.CreatedBy.lastName}`
            }
        },
    ]
    return (
        <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3 divide-y'>
            <h2 className='font-bold text-2xl text-center text-teal-500'>Hyväksymättömät työtunnit</h2>
            < ViewTable
                name='jobs'
                columns={jobColumns}
                shownItems={unconfirmedJobs}
                clickedItem={clickedUnconfirmed}
                handleItemClick={handleEventClick}
            />
            <div>
                {clickedUnconfirmed !== '' && <JobDetail oneJob={clickedUnconfirmed} unconfirmed={true}/>}
            </div>
        </div>
    )
}
export default ForemanView