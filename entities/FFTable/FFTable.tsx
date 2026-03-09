'use client'
import AddFeatureFlag from "@/features/AddFeatureFlag/AddFeatureFlag";
import FFSearch from "@/features/FFSearch/FFSearch";
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags";
import { InfoIcon } from "@/shared/Icon";
import { Flex, Switch, Table, TableProps } from "antd"

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
    description: '',
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
    lastModified: new Date(1)
  },  
  {
    key: '4',
    name: 'Depart4',
    isEnabled: true,
    departmentName: 'dep1',
    description: 'bla-bla-lba',
    lastModified: new Date(1)
  },
];

const FFTable = () => {

    return (
        <>
        <Flex align="center" gap={30}>
            <FFSearch/>
            <AddFeatureFlag/>
            <ReloadFeaturesFlags/>
        </Flex>
        
        <Table 
            rowSelection={{type: 'checkbox'}}
            pagination={{placement: ['bottomCenter'], pageSize: 10}}
            dataSource={data} 
            columns={FF_TABLE_COLUMNS}
        />
        </>
        
    )
}

export default FFTable