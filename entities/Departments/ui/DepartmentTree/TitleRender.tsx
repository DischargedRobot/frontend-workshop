import React, { useEffect, useRef, useState } from "react";
import { IDepartment } from "../../lib";
import { DataNode } from "antd/es/tree";
import { departmentApi } from "../../api";
import useDepartmentsStore from "../../model/useDepartmentsStore";


export interface IDepartmentNode extends IDepartment, Omit<DataNode, 'children' > {
}

interface Props {
    node: IDepartmentNode
    organisationId: number
}

const TitleRender = (props: Props): React.ReactNode => {

    const {
        node,
        organisationId,
    } = props
    
    const [isEditable, setIsEditable] = useState(false) 
    const [title, setTitle] = useState(node?.name) 
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditable])
    const changeName = useDepartmentsStore(state => state.changeDepartmentName) 
    return (
        <>
            { isEditable 
            ? <input 
            style={{paddingLeft: '8px'}}
                    ref={inputRef}
                    // onClick={(e) => {e.stopPropagation()}}
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                    onBlur={(e) => {
                        changeName(node, e.target.value)
                        departmentApi.changeDepartmentName(node, organisationId)
                        setIsEditable(false)
                    }}
                />
            :   <span 
                    // onClick={(e) => {e.stopPropagation()}} 
                    onDoubleClick={() => {setIsEditable(true); console.log('ssss')}}
                    >
                    {title}
                </span> 
            }
        </>
    )
    
}

export default TitleRender