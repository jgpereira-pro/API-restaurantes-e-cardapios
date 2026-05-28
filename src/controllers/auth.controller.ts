import { FastifyRequest, FastifyReply } from 'fastify'
import { AuthService } from '../services/auth.service'
import { CadastroRestauranteInput, LoginRestauranteInput } from '../schemas/AuthSchema'

const service = new AuthService()

export class AuthController {

  cadastrar = async (
    request: FastifyRequest<{ Body: CadastroRestauranteInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const restaurante = await service.cadastrar(request.body)
      return reply.status(201).send({ success: true, data: restaurante })
    } catch (err: any) {
      const msg = err.message || 'Erro ao cadastrar restaurante.'
      const status = msg.includes('já cadastrado') ? 409 : 500
      return reply.status(status).send({ success: false, message: msg })
    }
  }

  login = async (
    request: FastifyRequest<{ Body: LoginRestauranteInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const restaurante = await service.verificarCredenciais(request.body)

      // Gera JWT com role RESTAURANTE — assinado pelo próprio ms-restaurantes
      const token = await reply.jwtSign(
        {
          id: restaurante.id,
          email: restaurante.email,
          role: 'RESTAURANTE',
          restauranteId: restaurante.id,
        },
        { expiresIn: '8h' },
      )

      return reply.send({
        success: true,
        token,
        restaurante,
      })
    } catch (err: any) {
      const msg = err.message || 'Erro ao fazer login.'
      const status = msg.includes('inválidos') ? 401 : 500
      return reply.status(status).send({ success: false, message: msg })
    }
  }
}
