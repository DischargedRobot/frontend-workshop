export const TROLE = {
    FFC: 'featureFlag_create',
    FFD: 'featureFlag_delete',
    FFU: 'featureFlag_update',
    DC: 'department_create',
    DD: 'department_delete',
    DU: 'department_update',
    UC: 'user_create',
    UD: 'user_delete',
    UU: 'user_update'
} as const

export type TROLE = typeof TROLE[keyof typeof TROLE]

export interface IRole {
    name: string
    type: TROLE
    isEnabled: boolean
}
