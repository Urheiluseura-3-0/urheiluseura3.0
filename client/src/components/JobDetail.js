
const JobDetail = ({  oneJob }) => {
    const jobDetails = oneJob
    const dateTime = new Date(jobDetails.dateTime)
    const createdAtDate = new Date(jobDetails.createdAt)

    const hours = Math.floor(oneJob.hours)
    const minutes = Math.round((oneJob.hours - hours) * 60)
    const hoursMinutes= `${hours}h ${minutes}min`

    return (
        <div className='p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-3'>
            <h2 className='font-bold text-2xl text-center text-teal-500'>Tarkemmat tiedot</h2>
            <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                <table id = 'jobdetail' className='w-full'>
                    <tbody>
                        <tr className='bg-stone-100'>
                            <td className='p-2 font-semibold'>Ryhmä</td>
                            <td className='p-2'>{jobDetails.squad}</td>
                        </tr>
                        <tr>
                            <td className='p-2 font-semibold'>Tunnit</td>
                            <td className='p-2'>{hoursMinutes}</td>
                        </tr>
                        <tr className='bg-stone-100'>
                            <td className='p-2 font-semibold'>Paikka</td>
                            <td className='p-2'>{jobDetails.location}</td>
                        </tr>
                        <tr>
                            <td className='p-2 font-semibold'>Päivä</td>
                            <td className='p-2'>{dateTime.toLocaleDateString()}</td>
                        </tr>
                        <tr className='bg-stone-100'>
                            <td className='p-2 font-semibold'>Kellonaika</td>
                            <td className='p-2'>{dateTime.toLocaleTimeString()}</td>
                        </tr>
                        <tr>
                            <td className='p-2 font-semibold'>Lisätiedot</td>
                            <td className='p-2'>{jobDetails.context}</td>
                        </tr>
                        <tr className='bg-stone-100'>
                            <td className='p-2 font-semibold'>Status</td>
                            <td className='p-2'>{jobDetails.status === 0 ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                        </tr>
                        <tr>
                            <td className='p-2 font-semibold'>Luotu</td>
                            <td className='p-2'>
                                {createdAtDate.toLocaleDateString() + ' '
                                +  createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>
                        <tr className='bg-stone-100'>
                            <td className='p-2 font-semibold'>Hyväksyjän nimi</td>
                            <td className='p-2'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default JobDetail