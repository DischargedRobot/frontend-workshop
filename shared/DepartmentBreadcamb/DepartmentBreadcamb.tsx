'use client'
import { Breadcrumb } from "antd"

interface Props {
    items: string[]
    onClick: (path: string) => Promise<{featureFlags: string[]; departments: string[]}>
}

const DEPARTMENTS_REQUEST_URL = "http://local:3000/"

const DepartmentBreadcamb = ( {items, onClick: callback}: Props) => {

    return (
        <Breadcrumb 
            items={items.map((item) => 
                {
                const path = DEPARTMENTS_REQUEST_URL+item
                 return {title: 
                    <button onClick={() => callback(path)}
                    >
                        {item}
                    </button>,
                    }   
                })}
        />
    )
}

export default DepartmentBreadcamb