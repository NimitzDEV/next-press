const express = require('express')
const parser = require('body-parser')
const next = require('next')

const config = require('../config')
const { graphqlExpress } = require('apollo-server-express')
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
  }
}

const svcInit = ({ app, handle }, customConfig = {}) => {
  const server = express()
  server.use(parser.json())
  server.use('/graphql', graphqlExpress(gqlConfig))

  server.get('/read/:id', (req, res) => {
    app.render(
      req,
      res,
      '/index',
      Object.assign({}, req.body.query, req.query.params)
    )
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(config.api_port, err => {
    if (err) throw err
    console.error('Express Server Running on Port', config.api_port)
  })
}

module.exports = { svcInit }
