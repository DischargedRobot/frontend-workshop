import { CloseOutlined } from "@ant-design/icons"
import { IRole } from "./types"

const Role = (role: IRole) => {

    return (
        <button style={{backgroundColor: '#464649'}}>
            <CloseOutlined/>
            {role.name}
        </button>
    )
}

export default Role