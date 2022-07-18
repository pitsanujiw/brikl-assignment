import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { buildSchemaApp } from './graphql/schema'

async function bootstrap() {
  const schema = await buildSchemaApp()

  const app = new ApolloServer({ schema })

  const port = process.env.PORT || 3000

  await app.listen({ port })

  console.log(`Server ready at: http://localhost:${process.env.PORT}`)
}

bootstrap()
