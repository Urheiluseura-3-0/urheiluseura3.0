import { Link } from 'react-router-dom'

const LogoutMenu = () => {
    return(
        <div>
            <div className='flex justify-center space-x-4'>
                <Link className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-teal-200 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/">Kirjaudu sisään</Link>
                <Link className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-teal-200 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }}  to="/register">Rekisteröidy</Link>
            </div>
        </div>
    )
}

export default LogoutMenu