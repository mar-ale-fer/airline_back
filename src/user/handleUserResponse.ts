import log from 'loglevel'
import { UserError} from './userError'
import { userType} from '../../types/userType'
export const handleUserError = (e : Error ) => {
    log.error(e)
    //const message = e.name === 'SequelizeUniqueConstraintError'? 'Ya existe el nivel que intentas crear' : e.message

    if (e instanceof UserError) {
        return {
            success : false,
            message: `${e.message}`,
            user : e.user
        }
    }
    return  {
        success : false,
        message : `${e.message}`,
        user: {
            id : 0,
            name : ''
}}}

export const handleUserOk = (message: string, user : userType) =>  ({
    success : true,
    message,
    user
})