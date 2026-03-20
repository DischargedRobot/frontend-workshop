import React, { useEffect, useRef, useState } from "react";
import { IDepartment } from "../../lib";
import { Input } from "antd";
import { DataNode } from "antd/es/tree";


export interface IDepartmentNode extends IDepartment, Omit<DataNode, 'children' > {

}

interface Props {
    node: IDepartmentNode
}

const TitleRender = (props: Props): React.ReactNode => {


    const {
        node,
    } = props
    
    const [isEditable, setIsEditable] = useState(false) 
    const [title, setTitle] = useState(node?.name) 
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditable])

    return (
        <>
            { isEditable 
            ? <input 
            style={{paddingLeft: '8px'}}
                    ref={inputRef}
                    // onClick={(e) => {e.stopPropagation()}}
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                    onBlur={() => setIsEditable(false)}
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