import { FeatureFlag } from "../../FFTable/ui/FFTable";

export interface Department {
  id: number,
  name: string,
  children?: Department[],
  featureFlags?: FeatureFlag[],
  link: string,
}

export interface IDepartment {
  id: number,
  name: string,
  children: IDepartment[],
  featureFlags: FeatureFlag[],
  link: string,
}
