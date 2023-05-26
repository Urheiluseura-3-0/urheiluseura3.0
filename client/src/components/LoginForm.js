import { useState } from 'react'
import loginService from '../services/login'
import { useNavigate, Link } from 'react-router-dom'
import '../index.css'

const LoginForm = ({ login }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')




    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log('xDDD')
            await loginService.login({
                username, password
            })
            login()
            navigate('/home')
            setUsername('')
            setPassword('')

        } catch (exception) {
            console.log('wrong username or password')
            setUsername('')
            setPassword('')
        }
    }


    return (
        <div className='flex justify-center items-center h-screen bg-stone-100'>
            <div className='p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-3 divide-y divide-slate-200'>
                <h1 className='font-bold text-2xl text-center text-teal-500'>Kirjaudu sisään</h1>
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
                    <div>
                        <Link className='text-blue-700 underline'to="/register">Rekisteröidy</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm