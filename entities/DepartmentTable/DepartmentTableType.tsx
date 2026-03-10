import { FeatureFlag } from "../FFTable/FFTable";

export interface Department {
  id: number,
  name: string,
  children?: Department[],
  featureFlags?: FeatureFlag[],
  link: string,
}

export interface TableData extends Omit<Department, 'children'|'featureFlags' >{
  key: React.Key,
}