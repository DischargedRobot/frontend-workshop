import React from "react"
import { Loader } from "@/_page/Loader"

// должен быть такойже как и в application чтобы человек не заметил разницы
const LoadingPage: React.FC = () => {
	return (
		<Loader />
	)
}

export default LoadingPage
