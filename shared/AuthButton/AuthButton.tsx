type Props = {
	onClick: (e: unknown) => void
}

const AuthButton = (props: Props) => {
	const { onClick } = props

	return <button onClick={onClick}></button>
}
