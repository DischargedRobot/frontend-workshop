import Image from "next/image"
import "./LoaderIcon.scss"

import img from "./Loading2.png"

export const LoadIconLogo = () => {


    return (
        <Image
            src={img}
            alt="Loading"
            width={100}
            height={100}
            style={{ minWidth: 64, minHeight: 64 }}
            title="Загрузка" className="sprite-loader"
        />
    )
}