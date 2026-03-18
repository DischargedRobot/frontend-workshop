'use client'

import './DepartmentTree.scss'

import { Tree, TreeDataNode } from "antd"
import { Children, memo, useMemo, useState } from "react"
import useUserFiltersStore from '@/entities/UserList/model/useUserFiltersStore'
import useDepartmentsStore from '../../model/useDepartmentsStore'
import { IDepartment } from '../../lib'
import { title } from 'process'
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


const DepartmentTree = () => {

    const setFilterDepartmentIds = useUserFiltersStore(state => state.setDepartmentIds)
    const filterDepartmentIds = useUserFiltersStore(state => state.departmentIds)
    // console.log('DepartmentTree')

    const departments = useDepartmentsStore(state => state.departments)
    // const allDep = useDepartmentsStore(useShallow(state => state.getDepartmentsIncludingAllChildren()))
    // const [chek, setchek] = useState<number[]>([])
    const convertToTreeData = (departmentsForConvert: IDepartment[]): TreeDataNode[] => {
        return departmentsForConvert.map((department) => {
            return {
                title: department.name, 
                key: department.id, 
                children: convertToTreeData(department.children)
            }
        })
    }

    const departmentsTree: TreeDataNode[] = convertToTreeData(departments)

    return (
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
          checkStrictly
          selectable={false}
          treeData={departmentsTree}
        />
    )
}

export default memo(DepartmentTree)