import NavigationMenu from "@/entities/NavigationMenu/ui/NavigationMenu"
import React from "react"

interface Props {
    children: React.ReactNode
}

const PersonalLayout = ({children}: Props) => {
    return (
        <>
            <NavigationMenu />
            {children}
        </>
    )
}

export default PersonalLayout