// import the User model
const User = require('./User.js');
// import the Post model
const Post = require('./Post.js');

// one User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});
// Post can only belong to one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// export User and Post objects as properties
module.exports = { User, Post };