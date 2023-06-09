
const EventDetail = ({ one_event }) => {
    const eventDetails = one_event
    const dateTime = new Date(eventDetails.dateTime)

    return (
        <div>
            <h2>Tarkemmat tiedot</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Joukkue</td>
                        <td>{eventDetails.team}</td>
                    </tr>
                    <tr>
                        <td>Vastustaja</td>
                        <td>{eventDetails.opponent}</td>
                    </tr>
                    <tr>
                        <td>Paikka</td>
                        <td>{eventDetails.location}</td>
                    </tr>
                    <tr>
                        <td>Päivä</td>
                        <td>{dateTime.toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td>Kellonaika</td>
                        <td>{dateTime.toLocaleTimeString()}</td>
                    </tr>
                    <tr>
                        <td>Lisätiedot</td>
                        <td>{eventDetails.description}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{eventDetails.status === '0' ? 'Odottaa hyväksyntää' : 'Hyväksytty'}</td>
                    </tr>
                    <tr>
                        <td>Luotu</td>
                        <td>{eventDetails.createdAt}</td>
                    </tr>
                    <tr>
                        <td>Hyväksyjän nimi</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default EventDetail