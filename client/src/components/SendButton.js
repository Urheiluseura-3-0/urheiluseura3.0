const SendButton = ({ id, isInputValid, handleSubmit, message, text }) => {
    console.log(isInputValid)
    return (
        <div className='flex'>
            <button
                id={id}
                type='submit'
                className={`bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full ${isInputValid
                    ? ''
                    : 'opacity-30 cursor-not-allowed hover:'}
                font-semibold text-white 
            `}
                disabled={!isInputValid}
                title={isInputValid ? null : message}
                onClick={handleSubmit}>{text}</button>

        </div>
    )
}

export default SendButton