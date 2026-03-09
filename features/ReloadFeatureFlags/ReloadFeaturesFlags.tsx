import './ReloadFeaturesFlags.scss'

import { ReloadOutlined } from "@ant-design/icons"

const ReloadFeaturesFlags = () => {

    return (
        <button className='reload-feature-flags'>
            <ReloadOutlined/>
            Обновить
        </button>
    )
}

export default ReloadFeaturesFlags