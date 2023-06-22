
const ViewTable = ({
    name,
    columns,
    shownItems,
    clickedItem,
    handleItemClick,
}) => {

    return (
        <div className='flex justify-center items-center mt-4'>
            <div className='peer border rounded border-gray-800 rounded-xs overflow-hidden'>
                <table id={`${name}`} className='text-center text-xs bg-stone-100'>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className='p-4 cursor-pointer hover:bg-gray-300'
                                    id={column.id}
                                    onClick={column.sort}>
                                    {column.text}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {shownItems.map((item, index) => (
                            <tr id={`${name}row`}
                                key={item.id}
                                className={`${item.id === clickedItem.id
                                    ? 'bg-gray-400'
                                    : index % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-stone-100'}
                                border hover:bg-gray-300 text-center cursor-pointer`}
                                onClick={(event) => handleItemClick(event, item)}
                            >
                                {columns.map((column) => (
                                    <td key={column.id} className="p-4">
                                        {column.render(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewTable