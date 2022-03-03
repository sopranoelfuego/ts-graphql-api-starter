import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
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
import Context from './types/context'
import { verifyJwt } from './utils/jwt'
import { User } from './schemas/userSchema'
import authChecker from './utils/authChecker'

async function bootstrap() {
 // BUILD SCHEMA
 const schema = await buildSchema({
  resolvers,
  authChecker,
 })
 const app = express()
 app.use(cookieParser())
 // MAKE APOLLO SERVER
 const server = new ApolloServer({
  schema,
  context: (ctx: Context) => {
   const context = ctx
   //  console.log('token out here', ctx.req.headers.authorization)
   if (ctx.req.headers.authorization) {
    let token = ctx.req.headers.authorization.split(' ')[1]
    const user = verifyJwt<User>(token)
    context.user = user
   }
   return context
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
