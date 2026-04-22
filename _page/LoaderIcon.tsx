import Image from "next/image"
import "./LoaderIcon.scss"

import img from "./Group 77.svg"
export const LoadIconLogo = () => {
    return (
        <div className="loader-icon">
            <svg
                className="loader-icon__svg"
                viewBox="0 0 85 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="76" y="9" width="62" height="30" rx="15" transform="rotate(90 76 9)" fill="#343439" />
                <rect x="76" y="9" width="62" height="30" rx="15" transform="rotate(90 76 9)" stroke="#ECECEC" strokeWidth="2" />
                <rect x="73" y="12" width="24" height="24" rx="12" transform="rotate(90 73 12)" fill="#ECECEC" />
                <circle className="eye" cx="52" cy="23" r="3" fill="#343439" />
                <rect x="39" y="9" width="62" height="30" rx="15" transform="rotate(90 39 9)" fill="#ECECEC" />
                <rect x="39" y="9" width="62" height="30" rx="15" transform="rotate(90 39 9)" stroke="#343439" strokeWidth="2" />
                <rect x="36" y="44" width="24" height="24" rx="12" transform="rotate(90 36 44)" fill="#343439" />
                <circle className="eye" cx="15" cy="56" r="3" fill="white" />
                <path d="M78 81C50.768 79.1889 20.6533 80.2454 9 81" stroke="#ECECEC" />
            </svg>
        </div>
    )
}