import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class RestauranteRepository {
  async create(data: Prisma.RestauranteCreateInput) {
    return prisma.restaurante.create({ data });
  }

  async findAll() {
    return prisma.restaurante.findMany();
  }

  async findById(id: string) {
    return prisma.restaurante.findUnique({ 
        where: { id },
        include: { categorias: { include: { itens: true } } }
    });
  }
}