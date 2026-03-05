
import './AuthTextInput.scss'



type Props = {
    title?: string
    placeholder: string
    name: string
    onClick?: unknown
    onChange?: (password: string) => boolean | null | unknown

}

const AuthTextInput = (props: Props) => {

    const {
        title,
        placeholder,
        name,
        onChange,
    } = props

    return(
        <label className="auth-text-input">
            {title}
            <input type="text" className='auth-text-input' placeholder={placeholder} name={name} onChange={onChange}/>
        </label>
    )
}

export default AuthTextInput