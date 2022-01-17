const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
  },
  posts(parent, args, { db }, info) {
    // console.log(db.posts);
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter((post) => post.title.includes(args.query));
  },
  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }
    return db.comments.filter((comment) => comment.title.includes(args.query));
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
};

export { Query as default };
