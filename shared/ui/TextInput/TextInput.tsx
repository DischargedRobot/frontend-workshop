import "./TextInput.scss"
import { InputHTMLAttributes, useState, ChangeEvent, memo } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	error?: string
	className?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput = (props: Props) => {
	const {
		label,
		error,
		className = "",
		onChange,
		value: externalValue,
		...inputProps
	} = props

	const [internalValue, setInternalValue] = useState(externalValue ?? "")

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInternalValue(e.target.value)
		onChange?.(e)
	}

	return (
		<label className="text-filed text">
			{label && <span>{label}</span>}
			<input
				autoComplete="off"
				className={`text-filed__input ${className}`}
				{...inputProps}
				value={internalValue}
				onChange={handleChange}
			/>
			{error && <span className="error">{error}</span>}
		</label>
	)
}

export default memo(TextInput)
