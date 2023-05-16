const express = require('express')
const app = express() 

app.get('/', (request, response) => {
    response.send('<p>Hello World</p>')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)}) 