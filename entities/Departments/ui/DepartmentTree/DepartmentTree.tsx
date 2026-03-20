'use client'

import './DepartmentTree.scss'

import { Empty, Tree, TreeDataNode } from "antd"
import {  memo} from "react"
import useDepartmentsStore from '../../model/useDepartmentsStore'
import { DataNode } from 'antd/es/tree'
import useDepartmentTree from '../../model/DepartmentTree/useDepartmentTree'

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

  const { filterDepartmentIds, setFilterDepartmentIds, error} = useDepartmentTree()

  // console.log('DepartmentTree')

  const departments = useDepartmentsStore(state => state.departments)
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
        checkStrictly
        selectable={false}
        treeData={departments as unknown as DataNode[]}
        fieldNames={{'key': 'id', 'title': 'name', 'children': 'children'}}
      />}
   </>
  )
}

export default memo(DepartmentTree)