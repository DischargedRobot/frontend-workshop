'use client'

import FFSearch from "@/features/FFSearch/FFSearch";
import { Switch, Table, TableProps } from "antd"
import Search from "antd/es/input/Search";

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
        title: 'Описание',
        key: 'description',
        dataIndex: 'description',
    },
]

interface FeatureFlag {
    name: string,
    departmentName: string,
    isEnabled: boolean,
    lastModified: Date,
    description: string,
}

interface FeatureFlagTable extends FeatureFlag{
    key: React.Key,
}

interface Props {
    data: FeatureFlag[]
}

const data: FeatureFlagTable[] = [
  {
    key: '1',
    name: 'Depart1',
    departmentName: 'dep1',
    isEnabled: false,
    description: 'bla-bla-lba',
    lastModified: new Date(0)
  },
  {
    key: '2',
    name: 'Depart2',
    departmentName: 'dep1',
    isEnabled: true,
    description: 'bla-bla-lba',
    lastModified: new Date(0)
  },
  {
    key: '3',
    name: 'Depart3',
    isEnabled: false,
    departmentName: 'dep1',
    description: 'bla-bla-lba',
    lastModified: new Date(0)
  },  
  {
    key: '4',
    name: 'Depart4',
    isEnabled: true,
    departmentName: 'dep1',
    description: 'bla-bla-lba',
    lastModified: new Date(0)
  },
];

const FFTable = () => {

    return (
        <>
        <FFSearch/>
        <Table 
            pagination={{placement: ['bottomCenter'], pageSize: 10}}
            dataSource={data} 
            columns={FF_TABLE_COLUMNS}
        />
        </>
        
    )
}

export default FFTable