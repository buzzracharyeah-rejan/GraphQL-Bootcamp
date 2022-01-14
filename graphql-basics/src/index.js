import { createServer } from 'graphql-yoga';
import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';
import data from './constants';

const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post]!
  comments(query: String): [Comment!]!
  me: User
  post: Post!
}

type Mutation {
  createUser(name: String!, email: String!, age: Int, married: Boolean): User!
  deleteUser(id: ID!): User!
  createPost(title: String!, body: String!, author: ID!): Post!
  createComment(text: String!, author: ID!, post: ID!): Comment!
}

input createUserInput {
  name: String!
  email: String!
  age: Int
  married: Boolean
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
        return data.users;
      }

      return data.users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return data.posts;
      }
      return data.posts.filter((post) => post.title.includes(args.query));
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return data.comments;
      }
      return data.comments.filter((comment) => comment.title.includes(args.query));
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
      const emailTaken = data.users.some((user) => user.email === args.email);

      if (emailTaken) throw new Error('email already taken');

      const user = {
        id: uuid(),
        ...args,
      };

      data.users.push(user);
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = data.users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error('invalid user id');

      const deletedUsers = data.users.splice(userIndex, 1);

      data.posts = data.posts.filter((post) => {
        const match = post.author === deletedUsers[0].id;
        data.comments = data.comments.filter((comment) => comment.post !== match.id);
        return !match;
      });

      data.comments = data.comments.filter((comment) => comment.author !== deletedUsers[0].id);
      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const { title, body, author } = args;

      if (!data.users.some((user) => user.id === author)) throw new Error('invalid user id');

      const post = {
        id: uuid(),
        ...args,
      };
      data.posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      if (!data.users.some((user) => user.id === args.author)) throw new Error('invalid user id');
      if (!data.posts.some((post) => post.id === args.post)) throw new Error('invalid post id');

      const comment = {
        id: uuid(),
        ...args,
      };
      data.comments.push(comment);
      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      console.log(parent);
      return data.users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return data.comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return data.parent.posts.reduce((acc, current) => {
        const post = data.posts.find((post) => post.id === current);
        return acc.concat(post);
      }, []);
    },
    comments(parent, args, ctx, info) {
      return data.comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return data.users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return data.posts.find((post) => post.id === parent.post);
    },
  },
};

const server = createServer({ typeDefs, resolvers });
// const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('server started successfully'));
