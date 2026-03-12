import './StructureOrganisation.scss'

import { IUser } from "@/entities/UserCard/types"
import { IRole, TROLE } from "@/shared/Role";
import DepartmentTree from '@/widgets/Tree/DepartmentTree';
import UserList from "@/widgets/UserList"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Menu, Tree, TreeDataNode } from "antd";
import { Content } from "antd/es/layout/layout"

const createIntialRoles = (): IRole[] => {
    const roles: IRole[] = [];
    for ( const [key, value] of Object.entries(TROLE)) {
        roles.push({name: key, type: value, isEnabled: false})
    }
    return roles
}

const users = [
    {login: 'L', password: 'ss', id:1, roles: createIntialRoles()},
    {login: 'rob', password: 'ss', id:2, roles: createIntialRoles()}
]


const tree: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

const StructureOrganisation = () => {

    
    return(
        <Content className="structure-organisation ">
            <DepartmentTree tree={tree}/>
            <UserList users={users}/>
        </Content>
    )
}

export default StructureOrganisation