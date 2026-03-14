import { IDepartment } from "../DepartmentType";

export interface TableData extends Omit<IDepartment, 'children' | 'featureFlags' >{
  key: React.Key,
  isSelected?: boolean,
}