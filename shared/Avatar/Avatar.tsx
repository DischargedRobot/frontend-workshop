import Image from "next/image"

import img from './furryAV.jpeg'

const Avatar = () => {

    return (
        <button>
            <Image 
                src={img}
                alt='Profile'
                width={32}
                height={32}
            />
        </button>
    )
}

export default Avatar