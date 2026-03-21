'use client'

import useFFTableFiltersStore, { TFeatureFlagTable } from '@/features/FFTableFilters/model/useFFTableFiltersStore';
import './FFTable.scss'

import { DeleteIcon, InfoIcon } from "@/shared/assets/Icon";
import { Empty, Switch, Table, TableProps } from "antd"
import { useFFStore, useFilteredFFs, useGetFFsFromServer } from '../model';
import useSWR from 'swr';
import { useEffect } from 'react';


export type TFFTableColumns = TableProps<IFeatureFlag>['columns']



const createFFTableColumns = (columnVisible: TFeatureFlagTable ): TFFTableColumns => {
    return [
        {
            title: 'Имя',
            key: 'name',
            dataIndex: 'name',
        },
        {
            hidden: !columnVisible.value.isVisible,
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

export interface IFeatureFlag {
    id: number,
    name: string,
    departmentId: number,
    departmentName?: string,
    value: boolean,
    lastModified?: string,
    description?: string,
}

// export interface IFeatureFlag extends IFeatureFlag{
//     key: React.Key,
// }



const FFTable = () => {

    const {
        FFs,
        isLoading,
        error,
    } = useGetFFsFromServer()
    const featureFlags = useFilteredFFs()

    console.log('FFTableRender')
    const filters = useFFTableFiltersStore(state => state.visibleColumns)

    // console.log(featureFlags, 'ff')
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
            loading={isLoading}
            locale={{
                emptyText: (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                    <span style={{ color: 'var(--text-color)' }}>
                        {'Фич флагов нет :('}
                    </span>
                    }
                />
                )
            }}
        />
    )
}

export default FFTable