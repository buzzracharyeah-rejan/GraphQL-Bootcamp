import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
type Query {
    name: String!
    age: Int
    email: String!
}`;

const resolvers = {
  Query: {
    name() {
      return 'reajn';
    },
    age() {
      return 22;
    },
    email() {
      return 'test@test.com';
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log(`server started at port 4000`));
