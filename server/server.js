const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3031;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// });

// server.start().then(() => {
// 	server.applyMiddleware({ app });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch((e) => console.log('seqelize startup error on port', PORT, e));
