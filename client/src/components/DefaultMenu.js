import { Link } from 'react-router-dom'

const DefaultMenu = () => {
    return (

        <nav className="border-gray-200 bg-teal-400">
            <div id='navigationbar' className="flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex items-center space-x-4'>
                    <Link
                        id='login-link'
                        className='flex items-center bg-white rounded \
                            ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 \
                            text-sm font-semibold text-gray-600 text-center'
                        style={{ padding: 5 }}
                        to="/" >
                        Kirjaudu sisään
                    </Link>
                    <Link
                        id='register-link'
                        className='flex items-center bg-white rounded \
                    ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 \
                    text-sm font-semibold text-gray-600 text-center'
                        style={{ padding: 5 }}
                        to="/register">
                        Rekisteröidy
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default DefaultMenu