'use client'

import './FFTable.scss'

import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon";
import { Switch, Table, TableProps } from "antd"
import useFilteredFFs from "../model/useFilteredFFs";
import { useDepartment } from "@/widgets/FullDepartmentTable/model/useDepartment";
import useDepartmentsStore from "../../Departments/model/useDepartmentsStore";

const FF_TABLE_COLUMNS: TableProps<FeatureFlag>['columns'] = [
    {
        title: 'Имя',
        key: 'name',
        dataIndex: 'name',
    },
    {
        align: "center",
        title: 'Включён',
        key: 'isEnabled',
        dataIndex: 'isEnabled',
        render: (value) => (
            <Switch defaultChecked={value}></Switch>
        )
    },
    {
        title: 'Отдел/Проект',
        key: 'departmentName',
        dataIndex: 'departmentName',
    },    
    {
        align: "center",
        title: 'Последнее изменение',
        key: 'lastModified',
        dataIndex: 'lastModified',
    },
    {
        align: "center",
        title: 'Описание',
        key: 'description',
        dataIndex: 'description',
        render: (value: string) => (
            <InfoIcon info={value}/>
        ),
    },
    {
        align: "center",
        title: '', 
        key: "delete",
        render: () => (
            <button onClick={()=> {}}><DeleteIcon/> </button>
        ),
        width: "64px",
    },
]

export interface FeatureFlag {
    id: number,
    name: string,
    departmentId: number,
    departmentName?: string,
    isEnabled: boolean,
    lastModified: string,
    description: string,
}

// export interface FeatureFlag extends FeatureFlag{
//     key: React.Key,
// }

interface Props {
    featureFlags: FeatureFlag[]
}

const FFTable = ({featureFlags}: Props) => {


    return (
        <Table 
            className="ff-table "
            rowClassName={'text text_litle text_tiny'}
            size="small"
            rowKey='id'
            rowSelection={{type: 'checkbox'}}
            pagination={{placement: ['bottomCenter'], pageSize: 8}}
            dataSource={featureFlags} 
            columns={FF_TABLE_COLUMNS}
        />
    )
}

export default FFTable