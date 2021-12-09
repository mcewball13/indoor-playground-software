const User = require("./User");
const Post = require("./Post");
const PostTags = require("./PostTags");
const Tags = require("./Tags");
const Votes = require("./Votes");
const Comment = require("./Company");
const Picture = require("./Picture");
const Difficulty = require("./Difficulty");
const Type = require("./Type");

// create assosciations
// upvote associations start
// user/post association start
User.hasMany(Post, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});
// user/post association end

Post.belongsToMany(User, {
    through: Votes,
    as: "upvotes",
    foreignKey: "post_id",
    // foreignKey: 'post_id'
});

User.belongsToMany(Post, {
    through: Votes,
    as: "upvotes",
    foreignKey: "user_id",
});

User.hasMany(Votes, {
    foreignKey: "user_id",
});

Votes.belongsTo(User, {
    foreignKey: "vote_id",
});

Post.hasMany(Votes, {
    foreignKey: "post_id",
});

Votes.belongsTo(Post, {
    foreignKey: "post_id",
});
// upvote associations end

// user/comment association start
User.hasMany(Comment, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});
// user/comment association end

// post/comment association start
Post.hasMany(Comment, {
    foreignKey: "post_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});
// post/comment association end

Post.belongsToMany(Tags, {
    through: PostTags,
    // as:'tags',
    foreignKey: "post_id",
});

Tags.belongsToMany(Post, {
    through: PostTags,
    // as:'tags',
    foreignKey: "tag_id",
});
PostTags.belongsTo(Post, {
    foreignKey: "post_id",
    // onDelete: 'SET NULL'
});

PostTags.belongsTo(Tags, {
    foreignKey: "tag_id",
    // onDelete: 'SET NULL'
});

// img/post association start
Picture.hasMany(Post, {
    foreignKey: "img_id",
});

Post.belongsTo(Picture, {
    foreignKey: "img_id",
});
// img/post association end

// post/difficulty association start
Difficulty.hasMany(Post, {
    foreignKey: "difficulty_id",
});

Post.belongsTo(Difficulty, {
    foreignKey: "difficulty_id",
});
// post/difficulty association end

// post/type association start
Type.hasMany(Post, {
    foreignKey: "type_id",
});

Post.belongsTo(Type, {
    foreignKey: "type_id",
});

module.exports = {
    User,
    Post,
    PostTags,
    Tags,
    Votes,
    Comment,
    Picture,
    Difficulty,
    Type,
};
