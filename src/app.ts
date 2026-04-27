import fastify from 'fastify';
import swagger from '@fastify/swagger';
import apiReference from '@scalar/fastify-api-reference'; 
import { restauranteRoutes } from './routes/restauranteRoutes';

export const buildApp = async () => {
  const app = fastify({ logger: true });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API Restaurantes e Cardápios',
        description: 'Microsserviço de gestão de catálogo',
        version: '1.0.0',
      },
    }
  });

  await app.register(apiReference, {
    routePrefix: '/docs',
  });

  app.register(restauranteRoutes, { prefix: '/api' });

  app.get('/health', async (request, reply) => {
    return { status: 'UP', timestamp: new Date().toISOString() };
  });

  app.setErrorHandler((error: any, request, reply) => {
    app.log.error(error);
    reply.status(error.statusCode || 500).send({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode || 500
    });
  });

  return app;
};