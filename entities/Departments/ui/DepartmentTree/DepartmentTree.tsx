'use client'

import './DepartmentTree.scss'

import { Empty, Tree, TreeDataNode } from "antd"
import {  memo, useEffect, useMemo, useState } from "react"
import useDepartmentsStore from '../../model/useDepartmentsStore'
import { DataNode, EventDataNode } from 'antd/es/tree'
import useDepartmentTree from '../../model/DepartmentTree/useDepartmentTree'
import { IDepartment } from '../../lib'
import TitleRender, { IDepartmentNode } from './TitleRender'
import useOrganisationStore from '@/entities/Organisation/model/useOrganisationStore'
import { departmentApi } from '../../api'
import useSWR, { useSWRConfig } from 'swr'
import { APIError } from '@/shared/api/APIErrors'
import { useShallow } from 'zustand/shallow'

interface Props {
    tree: TreeDataNode[]
    // onCheck: (departmentsId: number[]) => void
}


const tree: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: 1,
    children: [
      {
        title: 'parent 1-0',
        key: 2,
        children: [
          {
            title: 'leaf',
            key: 3,
          },
          {
            title: 'leaf',
            key: 4,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: 5,
        children: [
          { 
            title: <span style={{ color: '#1677ff' }}>sss</span>, 
            key: 6 
          }
        ],
      },
    ],
  },
];
const titleRender = (node: IDepartment) => {
  console.log(node)
  return (
    <span onClick={(e) => {e.stopPropagation();}}>{node.name}</span>
  )
}

const DepartmentTree = () => {

  const { filterDepartmentIds, setFilterDepartmentIds, error} = useDepartmentTree()

  // console.log('DepartmentTree')

  const departments = useDepartmentsStore(state => state.departments)
  const changeDepartmentChildren = useDepartmentsStore(state => state.changeDepartmentChildren)
  // const allDep = useDepartmentsStore(useShallow(state => state.getDepartmentsIncludingAllChildren()))
  // const [chek, setchek] = useState<number[]>([])
  // const convertToTreeData = (departmentsForConvert: IDepartment[]): TreeDataNode[] => {
  //     return departmentsForConvert.map((department) => {
  //         return {
  //             title: department.name, 
  //             key: department.id, 
  //             children: convertToTreeData(department.children)
  //         }
  //     })
  // }

  // const departmentsTree: TreeDataNode[] = convertToTreeData(departments)
  const { mutate } = useSWRConfig();

  const loadData = async (node: IDepartmentNode) => {
    if (node.isLeaf) return;
    // мутируем исходник, чтобы при повторном нажатии была повторная проверка (возможно, придётся убрать revalidate)
    try {
      const children = await mutate(
        [['organisationId', 'departmentId'], [organisationId, node.id]],
        () => departmentApi.getDescedantOfDepartments(organisation.id, node, 2),
        { revalidate: true }
      );
    
      if (children != undefined) {
      console.log(children, 'child')

        changeDepartmentChildren(node, children);
      } 
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        changeDepartmentChildren(node, []);
      }
    }
  };

  const organisationId = useOrganisationStore(state => state.organisation.id)
  const organisation = useOrganisationStore(state => state.organisation)
  const treeData = useMemo(() => (
    departments.map(department => ({
      ...department, 
      isLeaf: department.children.length === 0 || department.isService ? true : false
    } as IDepartmentNode
  ))), [departments])
  console.log(treeData, 'tree', departments)

  return (
    <>
      {departments.length == 0 
      ? 
      <Empty description={<span style={{color: 'var(--text-color) !important'}}>{error?.message ?? 'Отделов нет :(' }</span>}/>
      : 
      <Tree 
        checkedKeys={filterDepartmentIds}
        onCheck={(checkedKeys) => {
            console.log(checkedKeys)
            if (Array.isArray(checkedKeys)) {
                setFilterDepartmentIds(checkedKeys as number[])
                // setFilteredUsers(filterUsers(['departmentIds'], users))
            }
            else {
                setFilterDepartmentIds(checkedKeys.checked as number[])
                // setFilteredUsers(filterUsers(['departmentIds'], users))
            }
        }}
        className={`tree text-table text-table_litle text-table_tiny`}
        checkable
        loadData={loadData}
        checkStrictly
        selectable={true}
        titleRender={(node) => <TitleRender node={node as unknown as IDepartmentNode} organisationId={organisationId} key={node.key}/>}
        // treeData={departments as unknown as IDepartmentNode[]}
        treeData={treeData}
        fieldNames={{'key': 'id', 'title': 'name', 'children': 'children'}}
      />}
   </>
  )
}

export default memo(DepartmentTree)