import '../index.css'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {


    return (<div className='flex justify-center items-center h-screen bg-stone-100'>
        <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
            <h1 className='font-bold text-2xl text-center text-teal-500'>Kirjaudu Sisään</h1>
            <form onSubmit={handleLogin}>
                <div className='space-y-3'>
                    <div className='pt-3'>
                        <label className='block'>Käyttäjänimi</label>
                        <input
                            type='text'
                            value={username}
                            name='username'
                            onChange={({ target }) => setUsername(target.value)}
                            className='required border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                    <div>
                        <label className='block'>Salasana</label>
                        <input
                            type='password'
                            value={password}
                            name='password'
                            onChange={({ target }) => setPassword(target.value)}
                            className='required border border-gray-300 rounded p-2 w-full'
                        />
                    </div>
                    <div>
                        <button className='bg-teal-400 hover:bg-teal-600 px-5 py-1 leading-5 rounded-full font-semibold text-white'
                            type='submit'>
                            Kirjaudu</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default LoginForm