'use client'

import { useFilterOfUserList, useUsers } from '@/entities/UserList'
import './DepartmentTree.scss'

import { Tree, TreeDataNode } from "antd"
import { memo, useEffect } from "react"
import useUserFiltersStore from '@/entities/UserList/model/useUserFiltersStore'

interface Props {
    tree: TreeDataNode[]
    // onCheck: (departmentsId: number[]) => void
}

const DepartmentTree = (props: Props) => {
    const {
        tree,
        // onCheck: filterUsers,
    } = props

    // const users = useUsers(state => (state.users))
    // const setFilteredUsers = useUsers(state => (state.setFilteredUsers))

    const setDepartmentIds = useUserFiltersStore(state => state.setDepartmentIds)

    // console.log('DepartmentTree')

    return (
        <Tree 
            onCheck={(checkedKeys) => {
                console.log(checkedKeys)
                if (Array.isArray(checkedKeys)) {
                    setDepartmentIds(checkedKeys as number[])
                    // setFilteredUsers(filterUsers(['departmentIds'], users))
                }
                else {
                    setDepartmentIds(checkedKeys.checked as number[])
                    // setFilteredUsers(filterUsers(['departmentIds'], users))
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