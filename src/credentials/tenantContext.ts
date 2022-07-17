import { userSessionType } from "../../types/userSessionType";
import { getJWTTokenFromRequest, getUserFromToken } from "./sessionTokenBackend"
import { getUserAirlineId } from "../user/userUtils"
import { resource } from "./resourcesBackend";
import { resourceIsAuthorized } from "./resourceIsAuthorized";

export const tenantContext = async (req: any, resource: resource):
    Promise<{ sessionUser: userSessionType; userAirlineId: number; }> => {
    const sessionUser: userSessionType = getUserFromToken(getJWTTokenFromRequest(req))
    if (!sessionUser) throw new Error('There is no information about the user in the session');
    if (!resourceIsAuthorized(sessionUser.roles, resource))
        throw new Error(`The user's role does not allow him to access the resource "${resource}"`)
    const userAirlineId = await getUserAirlineId(sessionUser.email)
    return {
        sessionUser,
        userAirlineId
    }
}
