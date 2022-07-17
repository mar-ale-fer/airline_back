import { airlineType } from '../../../types/airlineType'
import models from '../../../models'

export const insertAirline = async (newAirline: airlineType): Promise<number> => {
    try {
        const insertedAirline = await models.Airline.create(newAirline)
        console.log(`airlineId:${insertedAirline.dataValues.id}`)
        return insertedAirline.dataValues.id

    } catch (error: any) {
        console.error(error)
        return 0
    }

}
