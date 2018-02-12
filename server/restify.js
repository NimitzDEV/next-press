const rest = require('restify')
const config = require('../config')
const fs = require('fs')
const path = require('path')

const restPlugins = require('restify-plugins')

const { graphqlRestify, graphiqlRestify } = require('graphql-server-restify')
const { makeExecutableSchema } = require('graphql-tools')

const Schema = require('./db/graphql/schema')
const Resolvers = require('./db/graphql/resolvers')
const Connectors = require('./db/graphql/connectors')

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

const gqlConfig = {
  schema: executableSchema,
  context: {
    db: Connectors
  },
  rootValue: 'NextPress'
}

// Generating Config
const svcConfig = {}
if (config.https_cert_file && config.https_cert_key) {
  svcConfig.cert = fs.readFileSync(
    path.resolve(__dirname, config.https_cert_file)
  )
  svcConfig.key = fs.readFileSync(
    path.resolve(__dirname, config.https_cert_key)
  )
}
if (config.version) svcConfig.version = config.version

const svcInit = ({ app, handle }, customConfig = {}) => {
  const server = rest.createServer(Object.assign(svcConfig, customConfig))

  server.use(restPlugins.bodyParser())
  server.use(restPlugins.queryParser())

  // graphql server
  server.post('/graphql', graphqlRestify(gqlConfig))
  server.get('/graphql', graphqlRestify(gqlConfig))
  server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }))

  // custom routing for /read
  server.get('/read/:id', (req, res) => {
    // use index to render the whole article
    app.render(req, res, '/index', Object.assign({}, req.query, req.params))
  })

  // handles for nextjs (this line should always be in the last)
  server.get(/.*/, (req, res) => handle(req, res))

  // Start Listening
  server.listen(config.api_port, () =>
    console.log('Server listening @', server.name, server.url)
  )
}

module.exports = { svcInit }
