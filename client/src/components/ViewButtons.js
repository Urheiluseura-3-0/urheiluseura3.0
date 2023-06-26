
const ViewButtons = ({
    name,
    nameForUI,
    viewSelected,
    handleViewSelected
}) => {
    return (
        <div className='flex justify-center items-center'>
            <button
                id={`unconfirmed${name}-button`}
                className={`${viewSelected === 'unconfirmed'
                    ? 'bg-rose-400 ring-2 ring-rose-600 text-white font-semibold text-sm'
                    : 'ring-1 ring-gray-200  text-gray-600 hover:bg-rose-200'} px-5 py-2 m-2 rounded-full`}
                onClick={() => handleViewSelected('unconfirmed')}
                disabled={viewSelected === 'unconfirmed'}>
                Odottaa hyväksyntää
            </button>
            <button
                id={`confirmed${name}-button`}
                className={`${viewSelected === 'confirmed'
                    ? 'bg-emerald-400 ring-2 ring-emerald-600 text-white font-semibold text-sm'
                    : 'ring-1 ring-gray-200  text-gray-600 hover:bg-emerald-200'} px-5 py-2 m-2 rounded-full`}
                onClick={() => handleViewSelected('confirmed')}
                disabled={viewSelected === 'confirmed'}>
                Hyväksytyt {nameForUI}
            </button>
            <button id={`all${name}-button`}
                className={`${viewSelected === 'all'
                    ? 'bg-blue-400 ring-2 ring-blue-600 text-white font-semibold text-sm'
                    : 'ring-1 ring-gray-200  text-gray-600 hover:bg-blue-200'} px-5 py-2 m-2 rounded-full`}
                onClick={() => handleViewSelected('all')}
                disabled={viewSelected === 'all'}>
                Kaikki {nameForUI}
            </button>
        </div>
    )
}

export default ViewButtons