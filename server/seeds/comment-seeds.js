const { Comment } = require("../models");

const commentData = [
    {
        comment_text: "This is the most amazing app on the planet",
        user_id: 1,
        post_id: 3
    },
    {
        comment_text: "You're right!",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "OMG Mike is soooo hot",
        user_id: 4,
        post_id: 2
    },
    {
        comment_text: "You don't know which Mike we're talking about do you?",
        user_id: 5,
        post_id: 2
    },
    {
        comment_text: "Cha Chinga",
        user_id: 1,
        post_id: 1
    },
    
];

const seedComment =()=> Comment.bulkCreate(commentData);

module.exports = seedComment;
