'use client'

import CollapsedIcon from '@/shared/assets/Icon/CollapsedIcon/CollapsedIcon';
import './FullDepartmentTree.scss'

import DepartmentTree from "@/entities/Departments/ui/DepartmentTree/DepartmentTree"
import { LeftOutlined } from "@ant-design/icons";
import { TreeDataNode } from "antd";
import { useState } from "react";

interface Props {
    tree: TreeDataNode[]

}
const FullDepartmentTree = (props: Props) => {
    const { 
        tree,
    } = props

    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={`department-tree ${isCollapsed && 'collapsed'}`}>
            {/* <button className='department-tree__button' onClick={() => {console.log(isCollapsed); setIsCollapsed(prev => !prev)}}>
                <CollapsedIcon isCollapsed={isCollapsed} />
            </button> */}
            <DepartmentTree tree={tree}/>
        </div>
    )
}

export default FullDepartmentTree