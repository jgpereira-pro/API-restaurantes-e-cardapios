import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class RestauranteRepository {
  async create(data: Prisma.RestauranteCreateInput) {
    return await prisma.restaurante.create({
      data: {
        nome: data.nome,
        cnpj: data.cnpj,
        endereco_logradouro: data.endereco_logradouro, 
        endereco_numero: data.endereco_numero,
        endereco_bairro: data.endereco_bairro,
        endereco_cidade: data.endereco_cidade,
        endereco_cep: data.endereco_cep
      }
    });
  }

  async findAll() {
    return prisma.restaurante.findMany();
  }

  async findById(id: string) {
    return prisma.restaurante.findUnique({ 
        where: { id },
    });
  }

  async update(id: string, data: any) {
    return await prisma.restaurante.update({
      where: { id },
      data 
    });
  }

  async delete(id: string) {
    return await prisma.restaurante.delete({
      where: { id }
    });
  }
}