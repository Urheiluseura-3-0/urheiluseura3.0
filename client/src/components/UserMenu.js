import { Link } from 'react-router-dom'


const UserMenu = ({ handleLogout }) => {

    return (

        <nav className="border-gray-200 bg-teal-400">
            <div id='navigationbar' className="flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex flex-col sm:flex-row items-center space-x-4 space-y-2 sm:space-y-0'>
                    <Link id='frontpage-link' className='flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center py-4' style={{ padding: 5 }} to="/home">
                        Etusivu
                    </Link>
                    <Link id='addevent-link' className='flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center py-4' style={{ padding: 5 }} to="/event">
                        Lisää tapahtuma
                    </Link>
                    <Link id='addjob-link' className='flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center py-4' style={{ padding: 5 }} to="/job">
                        Lisää työtunnit
                    </Link>
                </div>
                <button id='logout-button' className=' bg-red-400 hover:bg-red-500 px-5 py-1 leading-5 rounded-full font-semibold text-white' style={{ padding: 5, border: '1px solid black' }} onClick={handleLogout}>
                    Kirjaudu ulos
                </button>

            </div>
        </nav>

    )
}

export default UserMenu