import Image from "next/image"

import img from './furryAV.jpeg'

const Avatar = () => {

    return (
        <button>
            <Image 
                style={{borderRadius: 50}}
                src={img}
                alt='Profile'
                width={64}
                height={64}
            />
        </button>
    )
}

export default Avatar