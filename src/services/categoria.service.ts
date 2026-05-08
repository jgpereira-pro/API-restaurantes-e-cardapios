import { CategoriaRepository } from '../repositories/categoria.repository';
import { CriarCategoriaInput, AtualizarCategoriaInput } from '../schemas/CardapioSchema';
import { randomUUID } from 'crypto';

export class CategoriaService {
  private repository = new CategoriaRepository();
  
  async create(data: CriarCategoriaInput) {
    const novaCategoria = {
      id: randomUUID(), 
      restaurante_id: data.restaurante_id,
      titulo: data.titulo
    };
    return await this.repository.create(novaCategoria);
  }

  async findAllByRestaurante(restaurante_id: string) {
    return await this.repository.findAllByRestaurante(restaurante_id);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, data: AtualizarCategoriaInput) {
    const categoriaExiste = await this.repository.findById(id);
    if (!categoriaExiste) return null;

    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    const categoriaExiste = await this.repository.findById(id);
    if (!categoriaExiste) return null;

    return await this.repository.delete(id);
  }
}
