import { rolesType } from "./roleType"

export type userType = {
  id: number | null
  firstName: string
  lastName: string
  email: string
  mustChangePassword?: boolean
  password?: string
  backend?: boolean //is a platform's IT backender?
  roles: rolesType
  AirlineId: number
}

export const EmptyUser: userType = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  backend: false,
  password: "",
  mustChangePassword: false,
  roles: { roles: [] },
  AirlineId: 0
}