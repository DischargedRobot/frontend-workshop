import { UserRegistrationForm } from "@/features/UserRegistration"
import "./UserRegistration.scss"
import { Content } from "antd/es/layout/layout"
import { redirect } from "next/navigation"

const UserRegistrationPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>
}) => {
	const { token } = await searchParams

	if (!token) {
		redirect("/login")
	}
	return (
		<Content className="user-registration">
			<div className="user-registration__content">
				<h1>Регистрация</h1>
				<UserRegistrationForm token={token} />
			</div>
		</Content>
	)
}
export default UserRegistrationPage
