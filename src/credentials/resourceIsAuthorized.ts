import { resource } from "./resourcesBackend";
import { rolesType } from "../../types/roleType";
import { ROLE_ACCESSES } from "./roleAccessesBackend";
export const resourceIsAuthorized = 
    (roles : rolesType, resource: resource) : Boolean => {
        for (const role of roles.roles ) {
            if (ROLE_ACCESSES.get(role)?.includes(resource) ) 
                return true
            
        }
        return false
}