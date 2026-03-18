'use client'

import useFFTableFiltersStore, { TFeatureFlagTable } from '@/features/FFTableFilters/model/useFFTableFiltersStore';
import './FFTable.scss'

import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon";
import { Switch, Table, TableProps } from "antd"


export type TFFTableColumns = TableProps<FeatureFlag>['columns']



const createFFTableColumns = (columnVisible: TFeatureFlagTable ): TFFTableColumns => {
    return [
        {
            title: 'Имя',
            key: 'name',
            dataIndex: 'name',
        },
        {
            hidden: !columnVisible.isEnabled.isVisible,
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
            hidden: !columnVisible.departmentName.isVisible,
        },    
        {
            align: "center",
            title: 'Последнее изменение',
            key: 'lastModified',
            dataIndex: 'lastModified',
            hidden: !columnVisible.lastModified.isVisible,
        },
        {
            align: "center",
            title: 'Описание',
            key: 'description',
            dataIndex: 'description',
            render: (value: string) => (
                <InfoIcon info={value}/>
            ),
            hidden: !columnVisible.description.isVisible,
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
}
const FF_TABLE_COLUMNS: TFFTableColumns = [
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


    const filters = useFFTableFiltersStore(state => state.visibleColumns)
    return (
        <Table 
            className="ff-table "
            rowClassName={'text-table text-table_litle text-table_tiny'}
            size="small"
            rowKey='id'
            rowSelection={{type: 'checkbox'}}
            pagination={{placement: ['bottomCenter'], pageSize: 8}}
            dataSource={featureFlags} 
            columns={createFFTableColumns(filters)}
            tableLayout='fixed'
        />
    )
}

export default FFTable