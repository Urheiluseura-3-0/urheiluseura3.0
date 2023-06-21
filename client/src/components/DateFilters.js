const DateFilters = (
    {   showFilters,
        selectedDateFrom,
        selectedDateTo,
        handleDateFromChange,
        handleDateToChange }) => {

    if (showFilters === 'Pienennä') {
        return (
            <div className='flex justify px-5 py-2'>
                <div>
                    <label className="block mt-2">Tapahtumat alkaen</label>
                    <input
                        className='border rounded m-2 border-gray-300'
                        type='date'
                        id='datefrom'
                        value={selectedDateFrom}
                        onChange={handleDateFromChange}
                    />
                </div>
                <div>
                    <label className="block mt-2">Tapahtumat asti</label>
                    <input
                        className='border rounded m-2 border-gray-300'
                        type='date'
                        id='dateto'
                        value={selectedDateTo}
                        onChange={handleDateToChange}
                    />
                </div>
            </div>
        )
    }

    return null
}

export default DateFilters