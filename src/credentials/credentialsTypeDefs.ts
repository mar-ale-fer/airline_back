const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Mutation {
    credentialsCreateToken(
      user: String!
      password: String!
    ): CredentialsResponse!
  }
  type CredentialsResponse {
      success: Boolean!
      message: String!
      user: User!
      token: String!
  }  
`;
