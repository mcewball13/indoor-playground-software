const { Tags } = require("../models");

const tagsData = [
    {
        title: "Weights",
    },
    {
        title: "Outdoors",
    },
    {
        title: "Gym Required",
    },
    {
        title: "Quick",
    },
    
];

const seedTags = () => Tags.bulkCreate(tagsData);

module.exports = seedTags;
