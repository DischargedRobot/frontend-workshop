'use client'
import { Input } from "antd"
import React from "react"

const { Search } = Input

interface Props {
    onSearch: React.ChangeEventHandler<HTMLInputElement>
}

const UserSearch = (props: Props) => {

    const {
        onSearch,
    } = props

    return(
        <Search type={'search'} enterButton onChange={onSearch} placeholder="Логин пользователя"/>
    )
}

export default UserSearch