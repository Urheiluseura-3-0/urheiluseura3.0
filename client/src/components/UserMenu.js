import { Link } from 'react-router-dom'


const UserMenu = ({ handleLogout }) => {

    return(

        <div>
            <div className='flex justify-center space-x-4'>
                <Link id='frontpage-link' className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-teal-200 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/home">Etusivu</Link>
                <Link id='addevent-link'className= 'rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-teal-200 hover:bg-teal-200 text-sm font-semibold text-gray-600 text-center' style={{ padding:5 }} to="/event">Lisää tapahtuma</Link>
                <button id='logout-button' className= 'bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white' style= {{ padding:5, border: '1px solid black', position: 'absolute', top:0, right:0 }} onClick= {handleLogout}>Kirjaudu ulos</button>
            </div>
        </div>)

}

export default UserMenu