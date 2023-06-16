import { Link } from 'react-router-dom'


const UserMenu = ({ handleLogout }) => {

    return(

        <div>
            <div id='navigationbar' className='flex justify-center space-x-4 h-10 bg-cyan-300'>
                <Link id='frontpage-link' className= 'flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/home">Etusivu</Link>
                <Link id='addevent-link'className= 'flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/event">Lisää tapahtuma</Link>
                <Link id='addjob-link'className= 'flex items-center bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/job">Lisää työtunnit</Link>
                <button id='logout-button' className= 'h-10 bg-red-400 hover:bg-red-500 px-5 py-1 leading-5 rounded-full font-semibold text-white' style= {{ padding:5, border: '1px solid black', position: 'absolute', top:0, right:0 }} onClick= {handleLogout}>Kirjaudu ulos</button>
            </div>
        </div>)

}

export default UserMenu