import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import fetch from 'isomorphic-fetch';

const graphql = require('graphql');
const schema = require('../../server/db/graphql/schema');
const config = require('../../config');

let apolloClient = null;
let isServer = !process.browser;

const clientOptions = {
  ssrMode: isServer,
  cache: new InMemoryCache(),
};

if (isServer) {
  global.fetch = fetch;
  clientOptions.link = createHttpLink({
    uri: `http://localhost:${config.api_port}/graphql`,
  });
}

function create(initialState) {
  return new ApolloClient({
    connectDevTools: !isServer,
    ssrMode: isServer,
    link: createHttpLink({
      uri: `http://localhost:${config.api_port}/graphql`,
      crendentials: 'same-origin',
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  if (isServer) return create(initialState);
  if (!apolloClient) apolloClient = create(initialState);
  return apolloClient;
}
