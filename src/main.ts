import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { buildSchemaApp } from './graphql/schema'

async function bootstrap() {
  const schema = await buildSchemaApp()

  new ApolloServer({ schema }).listen({ port: process.env.PORT }, () =>
    console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`),
  )
}

bootstrap()
