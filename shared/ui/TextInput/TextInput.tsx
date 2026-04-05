import "./TextInput.scss"

import {
	UseFormRegister,
	FieldValues,
	RegisterOptions,
	Path,
} from "react-hook-form"

type Props<T extends FieldValues> = {
	type?: string
	placeholder?: string
	label?: string
	name: Path<T>
	register: UseFormRegister<T>
	rules?: RegisterOptions<T>
	error?: string
	className?: string
}

const TextInput = <T extends FieldValues>(props: Props<T>) => {
	const {
		placeholder,
		name,
		rules,
		register,
		error,
		type = "text",
		label,
		className = "",
	} = props

	return (
		<label className="text-filed text text_litle">
			{label && <span>{label}</span>}
			<input
				type={type}
				className={`text-filed__input ${className}`}
				placeholder={placeholder ?? ""}
				{...register(name, rules)}
			/>
			{error}
		</label>
	)
}

export default TextInput
