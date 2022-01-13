exports.comments = [
  { id: 1, text: 'comment1', author: '1', post: '3' },
  { id: 2, text: 'some other comments', author: '2', post: '3' },
  { id: 3, text: 'new comment', author: '3', post: '3' },
  { id: 4, text: 'this is good', author: '1', post: '2' },
];

exports.users = [
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

exports.posts = [
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
