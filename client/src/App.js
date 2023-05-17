import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001'

// App returns names requested from server
const App = () => {

    const [names, setNames] = useState('names')
    useEffect(() => {
        console.log('hei frontista')
        axios.get(baseUrl)
            .then(response => {
                setNames(JSON.stringify(response.data.map(item => item.name)))
                console.log('response.data',response.data)
            })

    }, [])

    return(
        <div>Hei <p>{ names }</p>
        </div>
    )
}

export default App