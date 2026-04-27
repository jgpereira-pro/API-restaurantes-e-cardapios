import { RestauranteRepository } from "../repositories/restaurante.repository";
import { Prisma } from '@prisma/client';

export class RestauranteService {
    private repository = new RestauranteRepository();

    async create(data: Prisma.RestauranteCreateInput) {
        return this.repository.create(data);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        return this.repository.findById(id);
    }
}
