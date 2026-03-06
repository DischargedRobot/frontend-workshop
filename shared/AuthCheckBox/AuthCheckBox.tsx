import './AuthCheckBox.scss'

interface Props {
    label: string
    name: string
}

const AuthCheckBox = (props: Props) => {

    const {
        label,
        name,
    } = props

    return (
        <label>
            <input className="checkbox" type="checkbox" name={name}/>
            {label}
        </label>
    )
}

export default AuthCheckBox