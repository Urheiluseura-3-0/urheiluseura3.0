import React from 'react'
import '../style.css'

const Notification = ({ message }) => {
    return (
        <div className="flex justify-center items-center mt-2">
            <div className="bg-red-400 text-white font-bold py-2 px-4 rounded">{message}</div>
        </div>
    )
}

export default Notification