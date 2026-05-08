import { FastifyReply, FastifyRequest } from 'fastify';
import { ItemService } from '../services/item.service';
import { CriarItemInput, AtualizarItemInput } from '../schemas/CardapioSchema';

export class ItemController {
  
  create = async (request: FastifyRequest<{ Body: CriarItemInput }>, reply: FastifyReply) => {
    const service = new ItemService();
    const item = await service.create(request.body);
    return reply.status(201).send(item);
  }
  
  findAll = async (request: FastifyRequest<{ Querystring: { categoria_id?: string } }>, reply: FastifyReply) => {
    const service = new ItemService();
    
    const { categoria_id } = request.query;
    
    const itens = await service.findAll(categoria_id);
    return reply.send(itens);
  }

  findById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const service = new ItemService();
    const { id } = request.params;
    const item = await service.findById(id);

    if (!item) {
      return reply.status(404).send({ message: 'Item não encontrado no cardápio' });
    }
    return reply.send(item);
  }

  update = async (request: FastifyRequest<{ Params: { id: string }, Body: AtualizarItemInput }>, reply: FastifyReply) => {
    const service = new ItemService();
    const { id } = request.params;
    
    const itemAtualizado = await service.update(id, request.body);
    return reply.send(itemAtualizado);
  }

  delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const service = new ItemService();
    const { id } = request.params;
    
    await service.delete(id);
    return reply.status(204).send(); 
  }
}