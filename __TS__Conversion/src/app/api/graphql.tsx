import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import { typeDefs, resolvers } from '../../../schemas';
// import Cors from 'micro-cors';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// const cors = Cors();


// export default cors(async function handler(req, res) {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://studio.apollographql.com"
//   );
//   res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
//   );
//   res.setHeader(
//       "Access-Control-Allow-Methods",
//       "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
//   );
//   if (req.method === "OPTIONS") {
//       res.end();
//       return false;
//   }
// });

startServerAndCreateNextHandler(apolloServer);

export const config = {
  api: {
    bodyParser: false,
  },
};