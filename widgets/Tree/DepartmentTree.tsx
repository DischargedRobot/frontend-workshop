'use client'

import { IUser } from '@/entities/UserCard/types'
import './DepartmentTree.scss'

import { LeftOutlined } from "@ant-design/icons"
import { Tree, TreeDataNode } from "antd"
import { useState } from "react"

interface Props {
    tree: TreeDataNode[]
    onCheck: (departmentsId: number[]) => void
}

const DepartmentTree = (props: Props) => {
    const {
        tree,
        onCheck: filterUsers,
    } = props

    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={`department-tree ${isCollapsed && 'collapsed'}`}>
            <button className='department-tree__button' onClick={() => {console.log(isCollapsed); setIsCollapsed(prev => !prev)}}>
                <LeftOutlined />
            </button>
            <Tree 
                onCheck={(checkedKeys) => {
                    if (Array.isArray(checkedKeys)) {
                        filterUsers(checkedKeys as number[])
                    }
                    else {
                        filterUsers(checkedKeys.checked as number[])
                    }
                }}
                className={`department-tree__tree`}
                checkable
                selectable={false}
                treeData={tree}/>
        </div>
    )
}

export default DepartmentTree