import { formatDate } from '../utils/listUtils'

const DateFilters = ({
    showFilters,
    nameForUI,
    selectedDateFrom,
    selectedDateTo,
    handleDateFromChange,
    handleDateToChange,
    handleShowDateFilters,
    showDateFilters }) => {
    return (
        <div>
            <span>{nameForUI} aikaväliltä {formatDate(selectedDateFrom)} - {formatDate(selectedDateTo)}</span>
            <button
                id='timeline-button'
                className='text-gray-600 font-semibold hover:text-gray py-1 px-2 m-2 border
                               border-gray-500 hover:border-teal-500 rounded'
                onClick={handleShowDateFilters}>{showDateFilters}</button>
            {showFilters === 'Pienennä'
                ?
                <div className='flex justify px-5 py-2'>
                    <div>
                        <label className="block mt-2">{nameForUI} alkaen</label>
                        <input
                            className='border rounded m-2 border-gray-300'
                            type='date'
                            id='datefrom'
                            value={selectedDateFrom}
                            onChange={handleDateFromChange}
                        />
                    </div>
                    <div>
                        <label className="block mt-2">{nameForUI} asti</label>
                        <input
                            className='border rounded m-2 border-gray-300'
                            type='date'
                            id='dateto'
                            value={selectedDateTo}
                            onChange={handleDateToChange}
                        />
                    </div>
                </div>
                :
                null
            }
        </div>
    )

}

export default DateFilters