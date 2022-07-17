import { rolesType } from "./roleType"

export type userSessionType = {
    email: string
    firstName: string
    lastName: string
    roles: rolesType
    backend: boolean
  } | null