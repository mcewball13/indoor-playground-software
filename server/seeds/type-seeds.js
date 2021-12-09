const { Type } = require("../models");

const typeData = [
    {
        type: "Cardio",
    },
    {
        type: "Core",
    },
    {
        type: "Strength",
    },
    {
        type: "Crossfit",
    },
];

const seedType =()=> Type.bulkCreate(typeData);

module.exports = seedType;