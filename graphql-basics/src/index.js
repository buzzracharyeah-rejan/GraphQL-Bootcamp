import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import { Query, Mutation, User, Post, Comment } from './resolvers';

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment,
};

// const server = createServer({ typeDefs, resolvers });
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});
server.start(() => console.log('server started successfully'));
