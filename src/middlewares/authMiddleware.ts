import { FastifyRequest, FastifyReply } from 'fastify'

export interface JwtRestaurantePayload {
  id: string
  email: string
  role: 'RESTAURANTE'
  restauranteId: string
  iat: number
  exp: number
}

// Middleware: verifica se está autenticado como restaurante
export async function autenticarRestaurante(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    await request.jwtVerify()
    const user = request.user as JwtRestaurantePayload
    if (user.role !== 'RESTAURANTE') {
      return reply.status(403).send({
        success: false,
        message: 'Acesso restrito a restaurantes.',
      })
    }
  } catch {
    return reply.status(401).send({
      success: false,
      message: 'Token inválido ou expirado.',
    })
  }
}

// Helper para obter o payload do restaurante autenticado
export function getRestauranteAuth(request: FastifyRequest): JwtRestaurantePayload {
  return request.user as JwtRestaurantePayload
}
