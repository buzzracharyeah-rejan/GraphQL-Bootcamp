import { createServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'rejan bajracharay',
    email: 'rejandev@gmail.com',
    age: 22,
    married: false,
    posts: ['1', '4'],
  },
  {
    id: '2',
    name: 'sarah',
    email: 'sarah@example.com',
    age: 23,
    married: false,
    posts: ['2'],
  },
  {
    id: '3',
    name: 'test',
    email: 'test@test.com',
    age: 30,
    married: true,
    posts: ['3'],
  },
];

const posts = [
  {
    id: '1',
    title: 'test',
    body: 'some test',
    author: '3',
  },
  {
    id: '2',
    title: 'alchemist',
    body: 'a really good book',
    author: '2',
  },
  {
    id: '3',
    title: 'js',
    body: "life's lessons",
    author: '1',
  },
  {
    id: '4',
    title: 'js',
    body: "life's lessons",
    author: '1',
  },
];

const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post]!
  me: User
  post: Post!
}

type User {
  id: ID!
  name: String! 
  age: Int!
  email: String!
  married: Boolean
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String! 
  body: String!
  author: User!
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
  Post: {
    author(parent, args, ctx, info) {
      // console.log(parent);
      return users.find((user) => user.id === parent.author);
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
      const arr = parent.posts.reduce((acc, current) => {
        const post = posts.find((post) => post.id === current);
        return acc.concat(post);
      }, []);
      return arr;
    },
  },
};
const server = createServer({ typeDefs, resolvers });

server.start(() => console.log('server started successfully'));
