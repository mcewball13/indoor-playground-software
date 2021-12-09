const sequelize = require('../config/connection');
const {User} = require('../models');

const userData = [
    {
        username: 'mcewball13',
        email: 'mcewball13@gmail.com',
        password: 'password123'
    },
    {
        username: 'portly right',
        email: 'portly@gmail.com',
        password: 'password123'
    },
    {
        username: 'Hank Aaron',
        email: 'Hanky@gmail.com',
        password: 'password123'
    },
    {
        username: 'Bill',
        email: 'KillBill@gmail.com',
        password: 'password123'
    },
    {
        username: 'Sammy',
        email: 'samsam@gmail.com',
        password: 'password123'
    },
];
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;