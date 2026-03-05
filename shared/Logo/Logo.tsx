import Image from "next/image"

type Props = {
    img: string
    alt?: string
    width?: number
    height?: number
}

const Logo = (props: Props) => {
    const { 
        img, 
        alt = "Logotype", 
        width = 64, 
        height = 64,
    } = props
    
    return (
        <Image 
            src={img}
            alt={alt}
            width={width}
            height={height}
        />
    )
}

export default Logo