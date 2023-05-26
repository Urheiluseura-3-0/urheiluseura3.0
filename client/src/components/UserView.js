

const userView = (props) => {



    return (
        <div>
            <p>Kirjautuneena</p>
            <button onClick= {props.logout}>Kirjaudu ulos</button>
        </div>
    )
}

export default userView