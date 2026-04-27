import { buildApp } from "./app";

const start = async () => {
  const app = await buildApp();
  
  try {
    await app.listen({ port: 3001, host: '127.0.0.1' });

    console.log('API rodando em http://localhost:3001');
    console.log('Documentação disponível em http://localhost:3001/docs');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
