const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.start().then(() => {
	server.applyMiddleware({ app });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//  app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../client/build/index.html'));
//  });


// Turn off sequelize for the moment to get it up and running, once models are done, activate


sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});

