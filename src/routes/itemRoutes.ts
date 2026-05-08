import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ItemController } from "../controllers/item.controller";
import { 
  criarItemSchema, 
  atualizarItemSchema, 
  idCardapioParamSchema,
  filtroItemQuerySchema
} from "../schemas/CardapioSchema";

const controller = new ItemController();

export async function itemRoutes(appOriginal: FastifyInstance) {
  const app = appOriginal.withTypeProvider<ZodTypeProvider>();

  app.post('/itens', {
    schema: {
      tags: ['Itens do Cardápio'],
      summary: 'Cadastra um novo produto vinculado a uma categoria',
      body: criarItemSchema
    }
  }, controller.create);

  app.get('/itens', {
    schema: {
      tags: ['Itens do Cardápio'],
      summary: 'Lista todos os itens do sistema ou filtra por categoria',
      querystring: filtroItemQuerySchema
    }
  }, controller.findAll);

  app.get('/itens/:id', {
    schema: {
      tags: ['Itens do Cardápio'],
      summary: 'Busca os detalhes de um item específico pelo seu ID',
      params: idCardapioParamSchema
    }
  }, controller.findById);

  app.put('/itens/:id', {
    schema: {
      tags: ['Itens do Cardápio'],
      summary: 'Atualiza dados de um item (ex: alterar preço ou inativar)',
      params: idCardapioParamSchema,
      body: atualizarItemSchema
    }
  }, controller.update);

  app.delete('/itens/:id', {
    schema: {
      tags: ['Itens do Cardápio'],
      summary: 'Remove um item definitivamente do banco de dados',
      params: idCardapioParamSchema
    }
  }, controller.delete);

}