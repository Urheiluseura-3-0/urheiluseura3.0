import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001'

/*const getHelloWorld = () => {
    console.log('hei frontista')
    axios.get(baseUrl)
        .then(response => {const requesti = response.data
            console.log('requesti',requesti)
            return requesti})
}*/
const App = () => {
    const [names, setNames] = useState('names')

    useEffect(() => {
        console.log('hei frontista')
        axios.get(baseUrl)
            .then(response => {
                setNames(JSON.stringify(response.data[0].nimi))
                console.log('response.data[0].nimi',response.data[0].nimi)
            })

    }, [])
    return(
        <div>Hei <p>{ names }</p>
        </div>
    )
}

export default App