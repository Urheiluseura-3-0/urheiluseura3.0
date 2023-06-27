const renderFormError = (parameter, parameterValid, errorid, errorMessage) => {

    const changedParameter = Number.isInteger(parameter) ? parameter === 0 : parameter.valueOf() === ''

    return (
        changedParameter || parameterValid ? null : (
            <p id={errorid} className='peer-focus:hidden text-red-500 text-sm'>
                {errorMessage}
            </p>
        )
    )
}

const renderClassName = (parameter, parameterValid) => {

    const changedParameter = Number.isInteger(parameter) ? parameter === 0 : parameter.valueOf() === ''

    return (
        `peer border rounded p-2 w-full ${changedParameter || parameterValid ? 'border-gray-300' : 'border-red-500'
        }`
    )
}

const FormField = ({ label, id, type, value, maxLength, min, max, onChange, isValid, errorId, errorMessage }) => {
    return (
        <div>
            <label className='block'>{label}</label>
            <input id={id}
                type={type}
                value={value}
                maxLength={maxLength}
                min={min}
                max={max}
                onChange={onChange}
                className={renderClassName(value.length, isValid)}
            />{renderFormError(value.length, isValid, errorId, errorMessage)}
        </div>
    )
}

export default FormField