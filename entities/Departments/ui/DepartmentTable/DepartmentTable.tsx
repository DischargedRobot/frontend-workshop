'use client'

import './DepartmentTable.scss'

import DeleteIcon from "@/shared/assets/Icon/DeleteIcon"
import NextLinkIcon from "@/shared/assets/Icon/NextLinkIcon"
import {  Table, TableProps } from "antd"
import { useFFMenu } from '@/app/personal/ffmenu/useFFMenu'
import useDepartmentsStore from '../../model/useDepartmentsStore'
import useFFFiltersStore from '@/entities/FFTable/model/useFFFiltersStore'
import { IDepartment} from '../../lib'
import useBreadcrumbStore from '@/entities/DepartmentBreadcamb/model/useBreadcrumbStore'
import { useShallow } from 'zustand/shallow'
import useOrganisationStore from '@/entities/Organisation/model/useOrganisationStore'
import { useSWRConfig } from 'swr'
import { departmentApi } from '../../api'
import { APIError } from '@/shared/api/APIErrors'
import { FFApi, useFFStore } from '@/entities/FFTable'
import { mutate } from 'swr'
// import { showToast } from '@/shared/ui/Toast/Toast'
import { text } from 'stream/consumers'
import { useToastStore } from '@/shared/ui/Toast/Toast'

// TODO: переместить в lib
const createColumns = (
  addDepartmentToBredcrumb: (department: IDepartment) => void,
  // selectDepartmentFFFilters: (department: IDepartment) => void,
  requesFFByDepAndItsChildren: (department: number) => Promise<void>,
  loadData: (department: IDepartment) => Promise<void>,
  removeDepartment: (dep: IDepartment) => Promise<void>
): TableProps<IDepartment>['columns'] => [
  {
    title: 'Имя отдела',
    dataIndex: 'name',
    key: 'NameDepartment',
    minWidth: 100,
  },
  {
    title: '',
    dataIndex: 'link',
    render: (_, department) => (
      <button
      onClick={() => {        
        // selectDepartmentFFFilters(department)
        addDepartmentToBredcrumb(department)
        loadData(department)
        requesFFByDepAndItsChildren(department.id)
      }}><NextLinkIcon/></button>
    ),
    key: 'link',
    width: "64px",
  },
  {
    title: '', 
    key: "delete",
    render: (_, department) => (
        <button style={{alignItems: 'center'}} onClick={() => removeDepartment(department)}><DeleteIcon/> </button>
    ),
    width: "64px",
    align: 'center',
    
  },
]
// TODO: переместить в lib
const getChildrenByPath = (departments: IDepartment[], departmentPath: IDepartment[] | undefined): IDepartment[] => {
  if (departmentPath === undefined) {
    return []
  }


  let children = departments
  // обходим, проникая в департамены, и ища отдел, который записан в пути
  for (let i = 0; i < departmentPath.length; i ++) {
    const currentDep = children.find(dep => departmentPath[i].id == dep.id)
    if (currentDep === undefined) {
      return []
    }
    children = currentDep.children
  }


  return children

  // return departmentPath.reduce((allDepartments: IDepartment[], dep: IDepartment) => {
  //   return (allDepartments.find(de => de.id === dep.id)?.children ?? [])
  // }, departments)
}


const TableDepartment = () => {

  // TODO: переместить в хук
  const isHidden: boolean = useFFMenu(state => state.isHidden)

  const organisationId = useOrganisationStore(state => state.organisation.id)
  const departmentPath = useBreadcrumbStore(useShallow(state => state.path))

  const departments = useDepartmentsStore(useShallow(state => getChildrenByPath(state.departments, departmentPath)))

  const changeDepartmentChildren = useDepartmentsStore(state => state.changeDepartmentChildren)

  const loadData = async (department: IDepartment ): Promise<void> => {
    const childrenLastDepartment = department.children
    console.log('loadData')
    
    // TODO: мб стоит поставить ограничения на то,что если есть дети, то не спрашивать повторно
    if (!department.isService){
      // мутируем исходник, чтобы при повторном нажатии была повторная проверка (возможно, придётся убрать revalidate)
      try {
        const children = await mutate(
          [['organisationId', 'departmentId'], [organisationId, department.id]], 
          () => departmentApi.getChildrenOfDepartments(organisationId, department.id),
        );
      
        if (children != undefined ) {
          changeDepartmentChildren(department, children);
          setFFFilterDepartment([ // после успешной загрузки ставим фильтры
            department.id, 
            ...path.map(pathsDep => pathsDep.id), 
            ...children.map(child => child.id)]
          )
        } 
      } catch (error) {
        if (error instanceof APIError && error.status === 404) {
          changeDepartmentChildren(department, []);
        }
      }
    } else {
        setFFFilterDepartment([// если есть в кеше, то ставим, что есть
        department.id, 
        ...path.map(pathsDep => pathsDep.id), 
        ...childrenLastDepartment.map(child => child.id)]
      )
    }
  };

  const addFFToStore = useFFStore(state => state.addFeatureFlags)
  
  const setToast = useToastStore(state => state.setToast)

  const getFFAndAddToStore = async (departmentId: number) => {
    console.log('getFFAndAddToStore')
    try {
      const FFs = await mutate (
        [['organisationId', 'departmentId', 'featureflags'], [organisationId, departmentId]],
        () => FFApi.getFFsByDepAndItsChildren(departmentId, organisationId),
        // {revalidate: true}
      )
      if (FFs !== undefined) {
        addFFToStore(FFs)
      }
    } catch (error) {
      setToast({
        type: 'error', 
        text: (error as { message?: string })?.message ?? 'Что-то пошло не так', 
        duration: 3000
      })
    }
  }
  const removeDepFromLocal = useDepartmentsStore(state => state.removeDepartment)

  const removeDepartment = async (dep: IDepartment) => {
    try {
      await departmentApi.removeDepartmentById(organisationId, dep.id)
      console.log('меняем')
      removeDepFromLocal(dep)

    } catch (error) {
      console.log(error, 'error')
    }
  }

  const path = useBreadcrumbStore(state => state.path)
  const setFFFilterDepartment = useFFFiltersStore(state => state.setDepartment)
  const columns = createColumns(
    useBreadcrumbStore(state => state.addDepartment), 
    // (nextDep: IDepartment) => {setFFFilterDepartment([
    //   nextDep.id, 
    //   ...path.map(pathsDep => pathsDep.id), 
    //   ...nextDep.children.map(child => child.id)]
    // )},
    getFFAndAddToStore,
    loadData,
    removeDepartment,
  )
  
  const setSelectedDepartments = useFFFiltersStore(state => state.setDepartment)
  const selectRow = (selectedRowKeys: number[]) => {
    if (selectedRowKeys.length === 0) {
      // когда не выбран ни 1, мы показываем все что приндлежат отделам по пути и те, которые находятся в отделах, кторые приписанны к последнему отделу в пути
      setSelectedDepartments([...departmentPath.map(dep => dep.id), ...departmentPath.at(-1)!.children.map(dep => dep.id)])
    } else {
      // когда выбран в таблице хотя бы 1
      setSelectedDepartments(selectedRowKeys as number[])
    }
  }


  console.log(departments)
  return (
    // TODO:  onSelect: (__, _, records) => {console.log(records)}}
      <Table 
        rowClassName={'text-table text-table_litle text-table_tiny'}
        rowSelection={{
          type: 'checkbox', 
          onChange: (selectedRowKeys) => selectRow(selectedRowKeys as number[])}}
        rowKey='id'
        expandable={{
          // отключает связь с потомками элементов при их выборе, чтобы когда выбрали всех в таблице, мы не брали ещё и их потомков
          childrenColumnName: '_NEVER_',
          // rowExpandable: () => false,
          // expandIcon: () => false        
        }}
        dataSource={departments}
        columns={columns}
        pagination={{ placement: ['bottomCenter'], pageSize: 6 }}
        size="small"
        className={`department-table ${isHidden && 'hidden'}`}
        >
      </Table>
  )
}

export default TableDepartment