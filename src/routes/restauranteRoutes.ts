import { FastifyInstance } from "fastify";
import { RestauranteController } from "../controllers/restaurante.controller";
import "@fastify/swagger";

export async function restauranteRoutes(app: FastifyInstance) {
  const controller = new RestauranteController();

  app.post('/restaurantes', {
    schema: { tags: ['Restaurantes'], description: 'Cria um novo restaurante' }
  }, controller.create);

  app.get('/restaurantes', {
    schema: { tags: ['Restaurantes'], description: 'Lista todos os restaurantes' }
  }, controller.findAll);

  app.get('/restaurantes/:id', {
    schema: { tags: ['Restaurantes'], description: 'Lista um restaurante e cardápio pelo ID' }
  }, controller.findById);
}