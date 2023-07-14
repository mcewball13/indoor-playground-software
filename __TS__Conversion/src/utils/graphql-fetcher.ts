import { T } from '@fullcalendar/core/internal-common';
import { GraphQLClient, Variables } from 'graphql-request';

import { paths } from 'src/routes/paths';

const GRAPHQL_ENDPOINT = paths.api.graphql;

// ----------------------------------------------------------------------

const client = new GraphQLClient(`http://localhost:8081/api/graphql`);

export const gqlFetcher = <TVariables extends Variables>(args: string | [string, TVariables]) => {
  const [query, variables] = Array.isArray(args) ? args : [args];

  return client.request(query, variables);
};
