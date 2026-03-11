import './AddButton.scss'

import { PlusCircleOutlined } from "@ant-design/icons"

const AddButton = () => {

    return (
        <button className="add-feature-flag" onClick={()=>{}}>
            <PlusCircleOutlined/>
            Добавить
        </button>
    )
}

export default AddButton