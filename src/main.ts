import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'

import { buildSchemaApp } from './graphql/schema'

async function bootstrap() {
  const schema = await buildSchemaApp()

  const app = new ApolloServer({ schema })

  const port = process.env.PORT || 3000

  const { server } = await app.listen({ port })

  console.log(`Server ready at: http://localhost:${process.env.PORT}`)

  /**
   * Updating keep alive timeout to be more than default timeout on LB side or Nginx in our case
   * Check this github issue for more info: https://github.com/nodejs/node/issues/27363
   * Default nginx keep alive timeout: http://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive_timeout
   * Interesting read from others:
   * - https://shuheikagawa.com/blog/2019/04/25/keep-alive-timeout
   * - https://www.notion.so/Mysterious-Connection-reset-by-NodeJS-logged-by-Nginx-0fae2213c195404c80c89b1c0cbfbf0c
   * - https://adamcrowder.net/posts/node-express-api-and-aws-alb-502/
   */
  server.keepAliveTimeout = 75 * 1000
  server.headersTimeout = 85 * 1000
}

bootstrap()
