'use client'

import './DepartmentTree.scss'

import { LeftOutlined } from "@ant-design/icons"
import { Tree, TreeDataNode } from "antd"
import { useState } from "react"

interface Props {
    tree: TreeDataNode[]
}

const DepartmentTree = (props: Props) => {
    const {
        tree
    } = props

    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={`department-tree ${isCollapsed && 'collapsed'}`}>
            <button className='department-tree__button' onClick={() => {console.log(isCollapsed); setIsCollapsed(prev => !prev)}}>
                <LeftOutlined />
            </button>
            <Tree 
                className={`department-tree__tree`}
                checkable
                selectable={false}
                treeData={tree}/>
        </div>
    )
}

export default DepartmentTree