const FormDropdown = ({ label, id, value, onChange, isValid, title, dropdown, errorId, errorMessage }) => {
    return (
        <div className='pt-3'>
            <label className='block'>{label}</label>
            <select id={id} value={value} onChange={onChange}
                className={`peer border rounded p-2 w-full ${isValid
                    ? 'border-gray-300'
                    : 'border-red-500'}`}
            >
                <option value='0'>{title}</option>
                {dropdown.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            {isValid ? null : (
                <p id={errorId} className='peer-focus:hidden text-red-500 text-sm'>
                    {errorMessage}
                </p>
            )}
        </div>
    )
}

export default FormDropdown