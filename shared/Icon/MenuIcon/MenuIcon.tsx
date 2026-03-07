interface Props {
    closed: boolean
}
const MenuIcon = ({ closed } : Props) => {

    return (
        closed 
        ? (<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32H56M8 16H56M8 48H56" stroke="#ECECEC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>) 
        : (<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32H56M8 16H56M8 48H56" stroke="#ECECEC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>)

    )
}

export default MenuIcon