const { gql } = require('apollo-server');

export const typeDefs = gql`

  type Mutation {
    createAirlineWithUser(
      name: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AirlineCRUDResponse!
  }
  type AirlineCRUDResponse {
    success: Boolean!
    message: String!
    airline: Airline!
  }

  type Airline {
    id: ID!
    name: String
    active: Boolean
  }
`;
