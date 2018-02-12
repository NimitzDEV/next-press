import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'

const graphql = require('graphql')
const schema = require('../../server/db/graphql/schema')
const config = require('../../config')

let apolloClient = null
let isServer = !process.browser
const clientOptions = {
  ssrMode: isServer
}

if (isServer) {
  global.fetch = fetch
  clientOptions.networkInterface = createNetworkInterface({
    uri: `http://localhost:${config.api_port}/graphql`
  })
}

function create(initialState) {
  clientOptions.initialState = initialState
  return new ApolloClient(clientOptions)
}

export default function initApollo(initialState) {
  if (isServer) return create(initialState)
  if (!apolloClient) apolloClient = create(initialState)
  return apolloClient
}
