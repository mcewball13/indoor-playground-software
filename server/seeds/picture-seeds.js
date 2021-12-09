const { Picture } = require("../models");

const pictureData = [
    {
        image_url: "/images/JPEG/cardio-1.jpg",
    },
    {
        image_url: "/images/JPEG/core-1.jpg",
    },
    {
        image_url: "/images/JPEG/crossfit-1.jpg",
    },
    {
        image_url: "/images/JPEG/strength-1.jpg",
    },
    {
        image_url: "/images/JPEG/cardio-2.jpg",
    },
    {
        image_url: "/images/JPEG/core-2.jpg",
    },
    {
        image_url: "/images/JPEG/crossfit-2.jpg",
    },
    {
        image_url: "/images/JPEG/strength-2.jpg",
    },
    {
        image_url: "/images/JPEG/cardio-3.jpg",
    },
    {
        image_url: "/images/JPEG/core-3.jpg",
    },
    {
        image_url: "/images/JPEG/crossfit-3.jpg",
    },
    {
        image_url: "/images/JPEG/strength-3.jpg",
    },
    {
        image_url: "/images/JPEG/core-4.jpg",
    },
    {
        image_url: "/images/JPEG/crossfit-4.jpg",
    },
    {
        image_url: "/images/JPEG/strength-4.jpg",
    },
];

const seedPicture =()=> Picture.bulkCreate(pictureData);

module.exports = seedPicture;
