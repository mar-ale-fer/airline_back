import { airlineType } from "../../types/airlineType";
import { userType } from "../../types/userType";
import { rolesType } from "../../types/roleType";
import bcrypt from 'bcrypt'

export const resolvers = {
    Mutation: {
        createAirlineWithUser: async (_: any, args: any, { models, req }: { models: any, req: any }) => {
            const newAirline: airlineType = {
                id: null,
                name: args.name,
                active: true
            }

            try {
                //check if an Airline with the same name already exists
                const AirlineFound = await models.Airline.findOne({
                    where: {
                        name: newAirline.name,
                    }
                })
                if (AirlineFound) {
                    return {
                        success: false,
                        message: `There is already an airline with the name ${newAirline.name}.`,
                        airline: {
                            id: 0,
                            name: newAirline.name,
                            active: false
                        }
                    }
                }
                //check if an user with the same email already exists
                const userFound = await models.User.findOne({
                    where: {
                        email: (args.email as string).toLowerCase(),
                    }
                })
                if (userFound) {
                    return {
                        success: false,
                        message: `There is already an use with the email ${args.email}.`,
                        airline: {
                            id: 0,
                            name: newAirline.name,
                            active: false
                        }
                    }
                }

                const insertedAirline = await models.Airline.create(newAirline)
                console.log(insertedAirline.dataValues)

                //create first airline's user. With hashed password
                // generate salt to hash password
                const salt = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                const hashedPassword: string = await bcrypt.hash(args.password, salt);

                const airlineRole: rolesType = {
                    roles: ['AIRLINE', 'ADMINISTRATOR']
                }
                const newUser: userType = {
                    id: null,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: (args.email as string).toLowerCase(),
                    mustChangePassword: true,
                    password: hashedPassword,
                    backend: false, //this is true only in create-super-user
                    roles: airlineRole,
                    AirlineId: insertedAirline.dataValues.id
                }

                const insertedUser = await models.User.create(newUser)
                console.log(insertedUser.dataValues)

                return {
                    success: true,
                    message: 'Airline created',
                    airline: {
                        ...newAirline,
                        id: insertedAirline.dataValues.id
                    }
                }

            } catch (error: any) {
                console.error(error)
                const errormessage = (error && error.errors && error.errors[0] && error.errors[0].type) ?
                    `Type: ${error.errors[0].type}. Message: ${error.errors[0].message}` :
                    `Code: ${error.parent.code}. Message: ${error.parent.detail}`

                return {
                    success: false,
                    message: `There are errors with the airline's creation. ${errormessage}.`,
                    airline: {
                        id: 0,
                        name: newAirline.name,
                        active: false
                    }
                }
            }
        }
    }
};

