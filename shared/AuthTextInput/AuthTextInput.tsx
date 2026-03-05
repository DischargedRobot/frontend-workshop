import './AuthTextInput.scss'

type Props = {
    name: string
    onClick: unknown
    onChange: unknown
}

const AuthTextInput = (props: Props) => {

    const {
        name,
        onChange,
    } = props

    return(
        <input type="text" className='auth-text-input' name={name} onChange={onChange}/>
    )
}

export default AuthTextInput