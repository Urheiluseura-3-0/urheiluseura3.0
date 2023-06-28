import jwt_decode from 'jwt-decode'
import MenuButton from './MenuButton'


const UserMenu = ({ handleLogout, token }) => {
    const decodedToken = jwt_decode(token)
    return (

        <nav className="border-gray-200 bg-teal-400">
            <div id='navigationbar' className="flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex flex-col sm:flex-row items-center space-x-4 space-y-2 sm:space-y-0'>
                    <MenuButton linkId={'frontpage-link'} linkTo={'/home'} title={'Etusivu'} />
                    {(decodedToken.isWorker === 1 || decodedToken.isAdmin === 1) &&
                        <>
                            <MenuButton linkId={'addevent-link'} linkTo={'/event'} title={'Lisää tapahtuma'} />
                            <MenuButton linkId={'user-events-link'} linkTo={'/events'} title={'Katso tapahtumat'} />
                        </>
                    }
                    {(decodedToken.isCoach === 1 || decodedToken.isAdmin === 1) &&
                        <>
                            <MenuButton linkId={'addjob-link'} linkTo={'/job'} title={'Lisää työtunnit'} />
                            <MenuButton linkId={'user-jobs-link'} linkTo={'/jobs'} title={'Katso työtunnit'} />
                        </>
                    }
                    {(decodedToken.isForeman === 1 || decodedToken.isAdmin === 1) &&
                        <>
                            <MenuButton linkId={'unconfirmed-jobs-link'}
                                linkTo={'/unconfirmed'}
                                title={'Hyväksymättömät työtunnit'}
                            />
                        </>
                    }
                </div>
                <button
                    id='logout-button'
                    className=' bg-red-400 hover:bg-red-500 px-5 py-1 leading-5 rounded-full font-semibold text-white'
                    style={{ padding: 5, border: '1px solid black' }}
                    onClick={handleLogout}>
                    Kirjaudu ulos
                </button>

            </div>
        </nav>

    )
}

export default UserMenu