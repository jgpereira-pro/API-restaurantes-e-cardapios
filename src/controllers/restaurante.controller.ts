import { FastifyReply, FastifyRequest } from 'fastify';
import { RestauranteService } from '../services/restaurante.service';
import { Prisma, Restaurante } from '@prisma/client';

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

    update = async (request: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) => {
        const service = new RestauranteService();
        const { id } = request.params;
        const restauranteAtualizado = await service.update(id, request.body as Partial<Restaurante>);

        if (!restauranteAtualizado) {
            return reply.status(404).send({ message: 'Restaurante não encontrado para atualização' });
        }
        return reply.send(restauranteAtualizado);
    }

    delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const service = new RestauranteService();
        const { id } = request.params;        
        const restauranteDeletado = await service.delete(id);

        if (!restauranteDeletado) {
            return reply.status(404).send({ message: 'Restaurante não encontrado para remoção' });
        }
        return reply.status(204).send(); 
    }
}
