import fastify from 'fastify';
import swagger from '@fastify/swagger';
import apiReference from '@scalar/fastify-api-reference';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { restauranteRoutes } from './routes/restauranteRoutes';
import { categoriaRoutes } from './routes/categoriaRoutes';
import { itemRoutes } from './routes/itemRoutes';
import fastifyJwt from '@fastify/jwt';

export const buildApp = async () => {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  if (!process.env.JWT_SECRET) {
    throw new Error("⚠️ JWT_SECRET não foi encontrado no ficheiro .env");
  }

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API Restaurantes e Cardápios',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });

  await app.register(apiReference, {
    routePrefix: '/docs',
  });

  app.register(restauranteRoutes, { prefix: '/api' });
  app.register(categoriaRoutes, { prefix: '/api' });
  app.register(itemRoutes, { prefix: '/api' });

  return app;
};