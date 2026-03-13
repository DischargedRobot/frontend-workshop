'use client'

import './StructureOrganisation.scss'

import FullUserList from '@/widgets/FullUserList/FullUserList';
import DepartmentTree from '@/widgets/Tree/DepartmentTree';
import { TreeDataNode } from "antd";
import { Content } from "antd/es/layout/layout"
import useStructure from './model/useStructure';
import useFilterOfUserList from '@/entities/UserList/model/useFilterOfUserList';

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

const StructureOrganisation = () => {


  const users = useStructure(state => (state.users))
  const filteredUsers = useStructure(state => (state.filteredUsers))
  const setFilteredUsers = useStructure(state => (state.setFilteredUsers))

  const { filterByDepartmentsId: filterUser } = useFilterOfUserList()
  const departments = useStructure(state => (state.departments))

  return(
      <Content className="structure-organisation ">
          <DepartmentTree 
            tree={tree} 
            onCheck={
              (departmentsId) => {
                console.log(departmentsId)
                console.log('filter', users, filterUser(users, departmentsId))
                setFilteredUsers(filterUser(users, departmentsId))
              }}
            />
          <FullUserList users={filteredUsers}/>
      </Content>
  )
}

export default StructureOrganisation