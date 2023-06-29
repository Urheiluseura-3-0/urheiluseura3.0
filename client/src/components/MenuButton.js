import { Link } from 'react-router-dom'

const MenuButton = ({ linkId, linkTo, title }) => {

    return (
        <Link
            id={linkId}
            className='flex items-center \
  bg-white rounded ring-1 ring-gray-700 ring-opacity-50 hover:ring-gray-700 hover:bg-teal-200 \
    text-sm font-semibold text-gray-600 text-center py-4'
            style={{ padding: 5 }}
            to={ linkTo }>
            { title }
        </Link>
    )
}

export default MenuButton