const { ApolloServer, gql } = require('apollo-server-lambda')
const { buildFederatedSchema } = require("@apollo/federation")
const typeDefs = require('./src/schema')
const resolvers =require('./src/resolvers')

const server = new ApolloServer({
  schema: buildFederatedSchema([
    { 
      typeDefs,
       resolvers 
      }
  ]),
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});
exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    methods: 'GET, POST',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
})

