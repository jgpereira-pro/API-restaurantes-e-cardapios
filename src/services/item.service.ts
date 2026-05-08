import { ItemRepository } from '../repositories/item.repository';
import { CriarItemInput, AtualizarItemInput } from '../schemas/CardapioSchema';

export class ItemService {
  private repository = new ItemRepository();

  async create(data: CriarItemInput) {
    return await this.repository.create(data);
  }

  async findAll(categoria_id?: string) {
    return await this.repository.findAll(categoria_id);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async update(id: string, data: AtualizarItemInput) {
    const itemExiste = await this.repository.findById(id);
    if (!itemExiste) return null;

    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    const itemExiste = await this.repository.findById(id);
    if (!itemExiste) return null;

    return await this.repository.delete(id);
  }
}
