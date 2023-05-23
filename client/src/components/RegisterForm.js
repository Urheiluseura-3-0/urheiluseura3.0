const registerForm = ( { handleRegister, name, setName, username, setUsername, password, setPassword } ) => {


    return(<div>
        <h1>Rekisteröidy</h1>
        <form onSubmit = { handleRegister }>
            <div>
        nimi <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
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
                    name="newpassword"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">rekisteröidy</button>
        </form>
    </div>
    )
}

export default registerForm