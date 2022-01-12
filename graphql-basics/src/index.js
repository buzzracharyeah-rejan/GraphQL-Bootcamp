import { createServer } from 'graphql-yoga';

const typeDefs = `
type Query {
    id: ID
    name: String! 
    age: Int
    employee: Boolean 
    gpa: Float
}`;

const resolvers = {
  Query: {
    id() {
      return '1';
    },
    name() {
      return 'rejan bajracharay';
    },
    age() {
      return 22;
    },
    employee() {
      return false;
    },
    gpa() {
      return 3.77;
    },
  },
};

const server = createServer({ typeDefs, resolvers });

server.start(() => console.log('server started successfully'));
