


const formatDate = (date) => {
    const formattedDate = new Date(date)
    const day = formattedDate.getDate().toString().padStart(2, '0')
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0')
    const year = formattedDate.getFullYear()

    return `${day}.${month}.${year}`
}

const getDate = (datetime) => {
    const date = new Date(datetime)
    return date.toLocaleDateString()
}

export { formatDate, getDate }