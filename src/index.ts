import express from 'express'
import dotenv from 'dotenv'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import {
 ApolloServerPluginLandingPageProductionDefault,
 ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { resolvers } from './resolvers'
import { dbConnect } from './utils/mongo'
dotenv.config()
async function bootstrap() {
 // BUILD SCHEMA
 const schema = await buildSchema({
  resolvers,
  //   authChecker,
 })
 const app = express()
 app.use(cookieParser())
 // MAKE APOLLO SERVER
 const server = new ApolloServer({
  schema,
  context: ctx => {
   return ctx
  },
  plugins: [
   process.env.NODE_ENV === 'production'
    ? ApolloServerPluginLandingPageProductionDefault()
    : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
 })
 await server.start()

 server.applyMiddleware({ app })
 const PORT = process.env.PORT || 4000
 app.listen(PORT, () => console.log(`server rund on port ${PORT}`))
 dbConnect()
}
bootstrap()
