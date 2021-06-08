// import models
const User = require('./User.js');
const Post = require('./Post.js');
const Vote = require('./Vote.js');
const Comment = require('./Comment.js');

// Establish One to Many relationship between User and Post
// one User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// Post can only belong to one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Establish Many to Many relationship between User and Vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
// Establish Many to Many relationship between Post and Vote
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// Direct connections between Vote and User/Post
// User can vote on a post
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
// user can vote on many posts
User.hasMany(Vote, {
    foreignKey: 'post_id'
});
// Posts can have many votes
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Direct connections between Comment and User/Post
// User can comment a post
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
// user can comment on many posts
User.hasMany(Comment, {
    foreignKey: 'post_id'
});
// Posts can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// export User and Post objects as properties
module.exports = { User, Post, Vote, Comment };