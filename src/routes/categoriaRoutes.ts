import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { CategoriaController } from "../controllers/categoria.controller";
import { criarCategoriaSchema, atualizarCategoriaSchema, idCardapioParamSchema } from "../schemas/CardapioSchema";

const controller = new CategoriaController();

export async function categoriaRoutes(appOriginal: FastifyInstance) {
    const app = appOriginal.withTypeProvider<ZodTypeProvider>();

    app.post('/categorias', {
        schema: {
            tags: ['Categorias (Cardápio)'],
            summary: 'Cria uma nova categoria para o cardápio',
            body: criarCategoriaSchema
        }
    }, controller.create);

    app.get('/categorias/restaurante/:restaurante_id', {
        schema: {
            tags: ['Categorias (Cardápio)'],
            summary: 'Lista todas as categorias de um restaurante específico',
            params: z.object({
                restaurante_id: z.string().uuid("O formato do ID do restaurante é inválido.")
            })
        }
    }, controller.findAllByRestaurante);

    app.put('/categorias/:id', {
        schema: {
            tags: ['Categorias (Cardápio)'],
            summary: 'Atualiza o título de uma categoria',
            params: idCardapioParamSchema,
            body: atualizarCategoriaSchema
        }
    }, controller.update);

    app.delete('/categorias/:id', {
        schema: {
            tags: ['Categorias (Cardápio)'],
            summary: 'Deleta uma categoria do cardápio',
            params: idCardapioParamSchema
        }
    }, controller.delete);
}
