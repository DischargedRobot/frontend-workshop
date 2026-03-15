'use client'

import './DepartmentTree.scss'

import { Tree, TreeDataNode } from "antd"
import { memo } from "react"
import useUserFiltersStore from '@/entities/UserList/model/useUserFiltersStore'

interface Props {
    tree: TreeDataNode[]
    // onCheck: (departmentsId: number[]) => void
}

const DepartmentTree = (props: Props) => {
    const {
        tree,
    } = props

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
            className={`tree`}
            checkable
            selectable={false}
            treeData={tree}
        />
    )
}

export default memo(DepartmentTree)