function checkMissing(parameter, message, response) {
    if (!parameter){
        return response.status(401).json({ error: message})
    }
}

module.exports = {
    checkMissing
}