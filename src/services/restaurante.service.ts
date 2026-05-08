import { RestauranteRepository } from "../repositories/restaurante.repository";
import { Prisma, Restaurante } from '@prisma/client';

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

    async update(id: string, data: Partial<Restaurante>): Promise<Restaurante | null> {
        const restaurante = await this.repository.findById(id);
        if (!restaurante) return null;
        
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        const restaurante = await this.repository.findById(id);
        if (!restaurante) return null;

        return this.repository.delete(id);
    }
}