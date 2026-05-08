import { FastifyReply, FastifyRequest } from 'fastify';
import { CategoriaService } from '../services/categoria.service';
import { CriarCategoriaInput, AtualizarCategoriaInput } from '../schemas/CardapioSchema';

export class CategoriaController {
  
  create = async (request: FastifyRequest<{ Body: CriarCategoriaInput }>, reply: FastifyReply) => {
    const service = new CategoriaService();
    const categoria = await service.create(request.body);
    return reply.status(201).send(categoria);
  }

  findAllByRestaurante = async (request: FastifyRequest<{ Params: { restaurante_id: string } }>, reply: FastifyReply) => {
    const service = new CategoriaService();
    const { restaurante_id } = request.params;
    const categorias = await service.findAllByRestaurante(restaurante_id);
    return reply.send(categorias);
  }

  update = async (request: FastifyRequest<{ Params: { id: string }, Body: any }>, reply: FastifyReply) => {
    const service = new CategoriaService();
    const { id } = request.params;
    
    const categoriaAtualizada = await service.update(id, request.body as any);

    if (!categoriaAtualizada) {
        return reply.status(404).send({ message: 'Categoria não encontrada' });
    }

    return reply.send(categoriaAtualizada);
  }

  delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const service = new CategoriaService();
    const { id } = request.params;
    
    await service.delete(id);
    return reply.status(204).send(); 
  }
}