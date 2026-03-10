'use client'
import { InfoIcon } from "@/shared/Icon";
import { Switch, Table, TableProps } from "antd"

const FF_TABLE_COLUMNS: TableProps<FeatureFlagTable>['columns'] = [
    {
        title: 'Имя',
        key: 'name',
        dataIndex: 'name',
    },
    {
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
        title: 'Последнее изменение',
        key: 'lastModified',
        dataIndex: 'lastModified',
    },
    {
        title: 'Описание',
        key: 'description',
        dataIndex: 'description',
        render: (value: string) => (
            <InfoIcon info={value}/>
        ),
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
            pagination={{placement: ['bottomCenter'], pageSize: 4}}
            dataSource={data} 
            columns={FF_TABLE_COLUMNS}
        />
    )
}

export default FFTable