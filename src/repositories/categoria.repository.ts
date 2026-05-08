import { prisma } from '../lib/prisma';

export class CategoriaRepository {
  async create(data: any) {
    return await prisma.categorias_cardapio.create({ data });
  }

  async findAllByRestaurante(restaurante_id: string) {
    return await prisma.categorias_cardapio.findMany({
      where: { restaurante_id }
    });
  }

  async findById(id: string) {
    return await prisma.categorias_cardapio.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: any) {
    return await prisma.categorias_cardapio.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.categorias_cardapio.delete({
      where: { id }
    });
  }
}