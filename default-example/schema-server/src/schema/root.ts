import { GraphQLSchemaModule, gql } from '@texo/server-graphql-schema';

const typeDefs = gql`
  type Query {
    engine: String!
  }
`;

const resolvers = {
  Query: {
    engine: async () => 'texo-schema'
  }
};

const module : GraphQLSchemaModule = { typeDefs, resolvers };

export default module;