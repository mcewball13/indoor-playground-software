const { Difficulty } = require("../models");

const difficultyData = [
    {
        difficulty: "Expert",
    },
    {
        difficulty: "Intermediate",
    },
    {
        difficulty: "Beginner",
    },
];

const seedDifficulty =()=> Difficulty.bulkCreate(difficultyData);

module.exports = seedDifficulty;
