import './StructureOrganisation.scss'

import FullUserList from '@/widgets/FullUserList/FullUserList';
import { TreeDataNode } from "antd";
import { Content } from "antd/es/layout/layout"
import FullDepartmentTree from '@/widgets/FullDepartmentTree';

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

  return(
      <Content className="structure-organisation ">
          <FullDepartmentTree 
            tree={tree} 
            />
          <FullUserList/>
      </Content>
  )
}

export default StructureOrganisation