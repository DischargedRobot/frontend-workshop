'use client'
import { redirect, RedirectType } from "next/navigation"
import { useEffect } from "react"

const Profile = () => {

    useEffect( 
        () => redirect('/ffmenu', RedirectType.push)
    , [])
    return (
        <></>
    )
}

export default Profile