const BackButton = ({ id, onClick, text }) => {
    return (
        <>
            <button
                id={id}
                className='bg-gray-200 hover:bg-gray-400 px-5 py-1 leading-5 rounded-full
                            font-semibold text-black'
                onClick={onClick}>
                {text}
            </button>

        </>
    )
}

export default BackButton