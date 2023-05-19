const loginForm = ( { handleLogin, username, setUsername, password, setPassword } ) => {


    return(<div>
        <h1>Kirjaudu</h1>
        <form onSubmit = { handleLogin }>
            <div>
    käyttäjänimi <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
    salasana
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    </div>
    )
}

export default loginForm