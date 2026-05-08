import { prisma } from '../lib/prisma';

export class ItemRepository {
  async create(data: any) {
    return await prisma.itemCardapio.create({ data });
  }

  async findAll(categoria_id?: string) {
    const where = categoria_id ? { categoria_id } : {};
    return await prisma.itemCardapio.findMany({
      where,
      include: {
        categorias_cardapio: { select: { titulo: true } }
      }
    });
  }

  async findById(id: string) {
    return await prisma.itemCardapio.findUnique({
      where: { id },
      include: {
        categorias_cardapio: { select: { titulo: true } }
      }
    });
  }

  async update(id: string, data: any) {
    return await prisma.itemCardapio.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.itemCardapio.delete({
      where: { id }
    });
  }
}
