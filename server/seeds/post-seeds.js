const { Post } = require("../models");

const postData = [
    {
        title: "Cardio workout for Beginners",
        description:
            "Learn the basics of cardio from this super easy and super fun beginngers introduction to cardio",
        img_id: 3,
        user_id: 2,
        type_id: 1,
        difficulty_id: 1,
        tagIds: [1, 4],
    },
    {
        title: "Crossfit workout for Beginners",
        description: "Get fit with Crossfit",
        img_id: 1,
        user_id: 3,
        type_id: 2,
        difficulty_id: 3,
        tagIds: [1],
    },
    {
        title: "Strength workout for Beginners",
        description:
            "Can you pick up a bus full of people? No? then you should learn this...",
        img_id: 1,
        user_id: 1,
        type_id: 1,
        difficulty_id: 1,
        tagIds: [],
    },
];
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
