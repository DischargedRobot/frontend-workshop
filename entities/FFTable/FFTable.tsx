'use client'

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
        title: 'Описание',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Отдел',
        key: 'departmentName',
        dataIndex: 'departmentName',
    }
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
    key: '1',
    name: 'Depart1',
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
        <Table dataSource={data} columns={FF_TABLE_COLUMNS}>

        </Table>
    )
}

export default FFTable