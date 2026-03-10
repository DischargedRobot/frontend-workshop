'use client'
import { DeleteIcon, InfoIcon } from "@/shared/Icon";
import { Switch, Table, TableProps } from "antd"

const FF_TABLE_COLUMNS: TableProps<FeatureFlagTable>['columns'] = [
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
    departmentName: string,
    isEnabled: boolean,
    lastModified: string,
    description: string,
}

export interface FeatureFlagTable extends FeatureFlag{
    key: React.Key,
}

interface Props {
    data: FeatureFlagTable[]
}

const FFTable = ({data}: Props) => {

    return (
        <Table 
            size="small"
            
            rowSelection={{type: 'checkbox'}}
            pagination={{placement: ['bottomCenter'], pageSize: 8}}
            dataSource={data} 
            columns={FF_TABLE_COLUMNS}
        />
    )
}

export default FFTable