import { Link } from 'react-router-dom'

const LogoutMenu = () => {
    return(
        <div>
            <div id='navigationbar' className='flex justify-center space-x-4'>
                <Link id='login-link' className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/">Kirjaudu sisään</Link>
                <Link id='register-link' className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }}  to="/register">Rekisteröidy</Link>
            </div>
        </div>
    )
}

export default LogoutMenu