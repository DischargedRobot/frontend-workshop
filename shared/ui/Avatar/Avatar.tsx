import Image from "next/image"

import img from './furryAV.jpeg'
import { memo } from "react"

const Avatar = () => {

    return (
        <>
            <Image 
                style={{borderRadius: 50}}
                src={img}
                alt='Profile'
                width={64}
                height={64}
            />
        </>
    )
}

export default memo(Avatar)