import { createServer } from 'graphql-yoga';

const typeDefs = `
type Query {
  me: User
  greeting(name: String, role: String!): String! 
  
}

type User {
  id: ID!
  name: String! 
  age: Int!
  email: String!
  married: Boolean
}`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'rejan',
        age: 22,
        email: 'rejandev@gmail.com',
        married: false,
      };
    },
    greeting(parent, args, ctx, info) {
      if (args) {
        return `hello ${args.name}. you\'re the greatest ${args.role} of all time`;
      }

      return "Hi there. hope you're well";
    },
  },
};
const server = createServer({ typeDefs, resolvers });

server.start(() => console.log('server started successfully'));
