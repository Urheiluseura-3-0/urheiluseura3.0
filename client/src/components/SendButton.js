const SendButton = ({ id, isInputValid, onClick, message, text }) => {
    return (
        <>
            <button
                id={id}
                type='submit'
                className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full ${isInputValid
                    ? ''
                    : 'opacity-30 cursor-not-allowed hover:'}
                font-semibold text-white `}
                disabled={!isInputValid}
                title={isInputValid ? null : message}
                onClick={onClick}>{text}</button>

        </>
    )
}

export default SendButton