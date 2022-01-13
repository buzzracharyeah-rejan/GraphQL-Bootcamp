import { createServer } from 'graphql-yoga';

const typeDefs = `
type Query {
  users: [User!]!
  me: User
  greeting(name: String, role: String!): String! 
  rewards: [Float!]!
  rewardsTotal(rewards: [Float]):Float!
  
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
    rewards() {
      return [1, 2, 3];
    },
    greeting(parent, args, ctx, info) {
      if (args) {
        // console.log({ parent, args, ctx, info });
        return `hello ${args.name}. you\'re the greatest ${args.role} of all time`;
      }

      return "Hi there. hope you're well";
    },
    rewardsTotal(parent, args, ctx, info) {
      if (args.rewards) {
        const rewardsTotal = args.rewards.reduce((acc, current) => acc + current, 0);
        return rewardsTotal;
      }
      return 0;
    },
  },
};
const server = createServer({ typeDefs, resolvers });

server.start(() => console.log('server started successfully'));
