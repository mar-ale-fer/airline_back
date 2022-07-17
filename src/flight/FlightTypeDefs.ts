const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    flights(
      name: String!,
      debug: String!,
    ): flightList!

    flightById(
      id: ID!,
      debug: String!,
      ):flightCRUDResponse!
  }

  type flightList{
    success: Boolean!
    message: String!
    flights: [flight]
  }

  type Mutation {
    flightCreate(
      name: String!
    ): flightCRUDResponse!
    flightUpdate(
      id: ID!
      name: String!
    ): flightCRUDResponse!
    flightDelete(
      id: ID!
    ): flightCRUDResponse!
  }
  type flightCRUDResponse {
    success: Boolean!
    message: String!
    flight: flight!
  }

  type flight {
    id: ID! 
    name: String
  }
`;
