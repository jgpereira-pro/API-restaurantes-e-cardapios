import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RestauranteController } from "../controllers/restaurante.controller";
import { criarRestauranteSchema, idParamSchema, atualizarRestauranteSchema } from "../schemas/RestauranteSchema";

const controller = new RestauranteController();

export async function restauranteRoutes(appOriginal: FastifyInstance) {
  const app = appOriginal.withTypeProvider<ZodTypeProvider>();

  app.post('/restaurantes', {
    schema: {
      tags: ['Restaurantes'],
      summary: 'Cadastra um novo restaurante',
      body: criarRestauranteSchema,
    }
  }, controller.create);

  app.get('/restaurantes', {
    schema: {
      tags: ['Restaurantes'],
      summary: 'Lista todos os restaurantes',
    }
  }, controller.findAll);

  app.get('/restaurantes/:id', {
    schema: {
      tags: ['Restaurantes'],
      summary: 'Busca um restaurante específico pelo ID',
      params: idParamSchema,
    }
  }, controller.findById);

  app.put('/restaurantes/:id', {
    schema: {
      tags: ['Restaurantes'],
      summary: 'Atualiza os dados de um restaurante',
      params: idParamSchema,
      body: atualizarRestauranteSchema
    }
  }, controller.update);

  app.delete('/restaurantes/:id', {
    schema: {
      tags: ['Restaurantes'],
      summary: 'Elimina um restaurante do sistema',
      params: idParamSchema
    }
  }, controller.delete);

}
