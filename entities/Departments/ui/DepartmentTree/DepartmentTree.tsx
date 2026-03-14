'use client'

import { useFilterOfUserList, useUsers } from '@/entities/UserList'
import './DepartmentTree.scss'

import { Tree, TreeDataNode } from "antd"
import { memo } from "react"

interface Props {
    tree: TreeDataNode[]
    // onCheck: (departmentsId: number[]) => void
}

const DepartmentTree = (props: Props) => {
    const {
        tree,
        // onCheck: filterUsers,
    } = props

    const users = useUsers(state => (state.users))
    const setFilteredUsers = useUsers(state => (state.setFilteredUsers))
    const { filterByDepartmentsId: filterUsers } = useFilterOfUserList()
    console.log('DepartmentTree')

    return (
        <Tree 
            onCheck={(checkedKeys) => {
                console.log(checkedKeys)
                if (Array.isArray(checkedKeys)) {
                    setFilteredUsers(filterUsers(users, checkedKeys as number[]))
                }
                else {
                    filterUsers(users, checkedKeys.checked as number[])
                }
            }}
            className={`department-tree__tree`}
            checkable
            selectable={false}
            treeData={tree}
        />
    )
}

export default memo(DepartmentTree)