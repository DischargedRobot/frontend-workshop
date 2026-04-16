import { ReloadButton } from "@/shared/ui"
import { IDepartment } from "@/entities/Departments"
import { useReloadUsers } from "../model"

interface Props {
	departments: IDepartment[]
}

const ReloadUsers = ({ departments }: Props) => {
	const { reloadUsers } = useReloadUsers()

	return <ReloadButton onClick={() => reloadUsers(departments)} />
}

export default ReloadUsers
