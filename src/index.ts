import { ApolloServer } from 'apollo-server';

import { typeDefs as credentialsTypeDefs } from './credentials/credentialsTypeDefs';
import { resolvers as credentialsResolvers } from './credentials/credentialsResolvers';
import { typeDefs as airlineTypeDefs } from './airline/AirlineTypeDefs';
import { resolvers as airlineResolvers } from './airline/AirlineResolvers';
import { typeDefs as userTypeDefs } from './user/UserTypeDefs';
import { resolvers as userResolvers } from './user/userResolvers';


import models from '../models';
import db from '../models';

const server = new ApolloServer({
    typeDefs: [
        airlineTypeDefs,
        credentialsTypeDefs,
        userTypeDefs,
    ],
    resolvers: [
        airlineResolvers,
        credentialsResolvers,
        userResolvers
    ],
    context: (req: any) => ({ models, req }),
})

//migration mode
// db.sequelize.sync({ match: /_dev$/ }).then(() => {
db.sequelize.sync({ match: /airlinedb$/, force: true }).then(() => {
    server.listen().then(({ url }: { url: String }) => {
        console.log(`Server listening at ${url}`);
    })
})

// //normal mode
// server.listen().then(({ url }: { url: String }) => {
//     console.log(`Server listening at ${url}`);
// })