const users = [
  {
    id: '1',
    name: 'rejan bajracharay',
    email: 'rejandev@gmail.com',
    age: 22,
    married: false,
  },
  {
    id: '2',
    name: 'sarah',
    email: 'sarah@example.com',
    age: 23,
    married: false,
  },
  {
    id: '3',
    name: 'test',
    email: 'test@test.com',
    age: 30,
    married: true,
  },
];
const posts = [
  {
    id: '1',
    title: 'test',
    body: 'some test',
    author: '3',
    published: true,
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
const comments = [
  { id: 1, text: 'comment1', author: '1', post: '3' },
  { id: 2, text: 'some other comments', author: '2', post: '3' },
  { id: 3, text: 'new comment', author: '3', post: '3' },
  { id: 4, text: 'this is good', author: '1', post: '2' },
];

const db = {
  users,
  posts,
  comments,
};

module.exports = db;
