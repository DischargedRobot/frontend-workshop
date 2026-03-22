'use client'
import './StructureOrganisation.scss'
import FullUserList from '@/widgets/FullUserList/FullUserList';
import { TreeDataNode } from "antd";
import { Content } from "antd/es/layout/layout"
import FullDepartmentTree from '@/widgets/FullDepartmentTree';
import { IDepartment } from '@/entities/Departments/lib';
import Toast from '@/shared/ui/Toast/Toast';
import { useState } from 'react';


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

  // const departments = useStructure(state => (state.departments))

  // const [key, setKey ] = useState(1)
  // setInterval(() => {
  //   setKey(prev => prev + 1)
  // }, 4000)

  return(
      <Content className="structure-organisation ">
          <FullDepartmentTree/>
          <FullUserList/>

      </Content>
  )
}

export default StructureOrganisation