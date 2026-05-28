import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { AuthController } from '../controllers/auth.controller'
import { cadastroRestauranteSchema, loginRestauranteSchema } from '../schemas/AuthSchema'

const controller = new AuthController()

export async function authRoutes(appOriginal: FastifyInstance) {
  const app = appOriginal.withTypeProvider<ZodTypeProvider>()

  // POST /restaurantes/cadastro
  app.post('/restaurantes/cadastro', {
    schema: {
      tags: ['Auth'],
      summary: 'Cadastrar novo restaurante com credenciais de acesso',
      body: cadastroRestauranteSchema,
    },
  }, controller.cadastrar)

  // POST /restaurantes/login
  app.post('/restaurantes/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Login do restaurante — retorna JWT com role RESTAURANTE',
      body: loginRestauranteSchema,
    },
  }, controller.login)
}
