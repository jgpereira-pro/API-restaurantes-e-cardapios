import { FastifyReply, FastifyRequest } from 'fastify';
import { RestauranteService } from '../services/restaurante.service.ts';
import { Prisma } from '@prisma/client';

export class RestauranteController {

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        const service = new RestauranteService();
        const data = request.body as Prisma.RestauranteCreateInput;
        const restaurante = await service.create(data);
        return reply.status(201).send(restaurante);
    }

    findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        const service = new RestauranteService();
        const restaurantes = await service.findAll();
        return reply.send(restaurantes);
    }

    findById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const service = new RestauranteService();
        const { id } = request.params;
        const restaurante = await service.findById(id);

        if (!restaurante) {
            return reply.status(404).send({ message: 'Restaurante não encontrado' });
        }
        return reply.send(restaurante);
    }
}
