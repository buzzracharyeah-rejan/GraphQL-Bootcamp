import { PubSub } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';
const Mutation = {
  createUser(parent, args, { db }, info) {
    // check if the email already exists
    // Array.prototype.some returns true if at least one of the element in the array passes the test
    const emailTaken = db.users.some((user) => user.email === args.email);

    if (emailTaken) throw new Error('email already taken');

    const user = {
      id: uuid(),
      ...args,
    };

    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) throw new Error('invalid user id');

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === deletedUsers[0].id;
      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      console.log(db.comments);
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== deletedUsers[0].id);
    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const {
      id,
      data: { name, email, age },
    } = args;

    const user = db.users.find((user) => user.id === id);
    if (!user) throw new Error('user not found');

    db.users = db.users.filter((user) => {
      const match = user.id === id;

      if (match) {
        if (typeof email === 'string') {
          const emailExists = db.users.some((user) => user.email === email);
          if (emailExists) throw new Error('email already taken');
          user.email = email;
        }

        if (typeof name === 'string') {
          user.name = name;
        }

        if (typeof age !== 'undefined') {
          user.age = age;
        }
      }
      return true;
    });

    return db.users.find((user) => user.id === id);
    // const user = db.users.find((user) => user.id === id);

    // if (!user) throw new Error('user not found');

    // if (typeof name === 'string') {
    //   user.name = name;
    // }

    // if (typeof email === 'string') {
    //   const emailExists = db.users.some((user) => user.email === email);
    //   if (emailExists) throw new Error('email already taken');
    //   user.email = email;
    // }

    // if (typeof age !== 'undefined') {
    //   user.age = age;
    // }
    // return user;
  },
  createPost(parent, { data }, { db, pubsub }, info) {
    const { title, body, author, published } = data;

    if (!db.users.some((user) => user.id === author)) throw new Error('invalid user id');

    const post = {
      id: uuid(),
      ...data,
    };
    db.posts.push(post);

    if (post.published) pubsub.publish('post', { post });
    return post;
  },
  deletePost(parent, args, { db }, info) {
    // const postExists = db.posts.find((post) => post.id === args.id);
    // if (!postExists) throw new Error('post does not exist');

    // db.posts = db.posts.filter((post) => {
    //   const match = post.id === args.id;
    //   if (match) {
    //     db.comments = db.comments.filter((comment) => comment.post !== post.id);
    //   }
    //   return !match;
    // });

    // return postExists;
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) throw new Error('post does not exist');

    const deletedPost = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.post !== deletedPost[0].id);

    return deletedPost[0];
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.author);
    const postExists = db.posts.some((post) => post.id === args.post && post.published);

    // if (!userExists) throw new Error('invalid user id');
    // if (!postExists) throw new Error('invalid post id');
    if (!userExists || !postExists) throw new Error('unable to find user or post');

    const comment = {
      id: uuid(),
      ...args,
    };
    db.comments.push(comment);
    pubsub.publish(`comment ${args.post}`, { comment });

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);
    if (commentIndex === -1) throw new Error('comment does not exist');

    const deletedComments = db.comments.splice(commentIndex, 1);
    db.comments = data.comments.filter((comment) => comment.id !== deletedComments[0].id);
    return deletedComments[0];
  },
};

export { Mutation as default };
