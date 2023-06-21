const DateFilters = ({ showFilters, selectedDateFrom, selectedDateTo, setDateFrom, setDateTo, resetSelections }) => {
    if (showFilters === 'Pienennä') {
        return (
            <div className='flex justify px-5 py-2'>
                <div>
                    <label className="block mt-2">Tapahtumat alkaen</label>
                    <input className='border rounded m-2 border-gray-300' type='date' id='datefrom' value={selectedDateFrom} onChange={({ target }) => {
                        setDateFrom(target.value)
                        resetSelections()
                    }}></input>
                </div>
                <div>
                    <label className="block mt-2">Tapahtumat asti</label>
                    <input className='border rounded m-2 border-gray-300' type='date' id='dateto' value={selectedDateTo} onChange={({ target }) => {
                        setDateTo(target.value)
                        resetSelections()
                    }}></input>
                </div>
            </div>
        )
    }
}

export default DateFilters