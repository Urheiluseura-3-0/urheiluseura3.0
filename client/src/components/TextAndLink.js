import { Link } from 'react-router-dom'

const TextAndLink = ({ text, linktext, to, id }) => {
    return (
        <>
            <span className='text-sm text-teal-500'>{text}</span>
            <Link id={id} className='text-sm text-blue-700 underline' to={to} >{linktext}</Link>
        </>
    )
}

export default TextAndLink