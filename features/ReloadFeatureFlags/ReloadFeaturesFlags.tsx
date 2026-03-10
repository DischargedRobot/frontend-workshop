import './ReloadFeaturesFlags.scss'

import { ReloadOutlined } from "@ant-design/icons"

interface Props {
    onClick: () => void
}


const ReloadFeaturesFlags = ({onClick}: Props) => {

    return (
        <button className='reload-feature-flags' onClick={()=>{}}>
            <ReloadOutlined/>
            Обновить
        </button>
    )
}

export default ReloadFeaturesFlags