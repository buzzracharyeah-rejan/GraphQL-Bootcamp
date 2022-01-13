import { createServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';
import { users, posts, comments } from './constants';

const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post]!
  comments(query: String): [Comment!]!
  me: User 
  post: Post!
}

type Mutation {
  createUser(name: String!, email: String!, age: Int): User! 
}

type User {
  id: ID!
  name: String! 
  age: Int
  email: String!
  married: Boolean
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String! 
  body: String!
  author: User!
  comments: [Comment!]!
}

type Comment { 
  id: ID!
  text: String!
  author:User!
  post: Post!
}
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => post.title.includes(args.query));
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
      return comments.filter((comment) => comment.title.includes(args.query));
    },
    me() {
      return {
        id: '123',
        name: 'rejan',
        age: 22,
        email: 'rejandev@gmail.com',
        married: false,
      };
    },
    post() {
      return {
        id: '3213',
        title: 'the real deal',
        body: 'great things can happen when you belive',
        author: '1',
      };
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      // check if the email already exists
      // Array.prototype.some returns true if at least one of the element in the array passes the test
      const emailTaken = users.some((user) => user.email === args.email);

      if (emailTaken) throw new Error('email already taken');

      const user = {
        id: uuid(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);
      return user;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      // console.log(parent);
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      // const newPosts = [];
      // parent.posts.forEach((id) => {
      //   const post = posts.find((post) => post.id === id);
      //   newPosts.push(post);
      // });
      // console.log(newPosts);
      // return newPosts;
      return parent.posts.reduce((acc, current) => {
        const post = posts.find((post) => post.id === current);
        return acc.concat(post);
      }, []);
    },
    comments(parent, args, ctx, info) {
      // return parent.comments.reduce((acc, current) => {
      //   return acc.concat(comments.find((comment) => comment.id === current));
      // }, []);
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      // const match = users.find((user) => user.id === parent.author);
      // console.log(match);
      // return match;

      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};
const server = createServer({ typeDefs, resolvers });

server.start(() => console.log('server started successfully'));
