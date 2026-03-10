import { FeatureFlag } from "../FFTable/FFTable";

export interface Department {
  name: string,
  children: Department[],
  featureFlags: FeatureFlag[],
  link: string,
}

export interface TableData extends Department{
  key: React.Key,
}