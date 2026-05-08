import { z } from 'zod';

export const criarCategoriaSchema = z.object({
  restaurante_id: z.string().uuid("O ID do restaurante deve ser um UUID válido"),
  titulo: z.string()
    .min(2, "O título da categoria deve ter no mínimo 2 caracteres")
    .max(100, "O título não pode exceder 100 caracteres"),
});

export const atualizarCategoriaSchema = criarCategoriaSchema.partial();

export type CriarCategoriaInput = z.infer<typeof criarCategoriaSchema>;
export type AtualizarCategoriaInput = z.infer<typeof atualizarCategoriaSchema>;

export const criarItemSchema = z.object({
  categoria_id: z.string().uuid("O ID da categoria deve ser um UUID válido"),
  nome: z.string()
    .min(2, "O nome do item deve ter no mínimo 2 caracteres")
    .max(150, "O nome não pode exceder 150 caracteres"),
  descricao: z.string().optional(),
  preco_centavos: z.number()
    .int("O preço deve ser um número inteiro (em centavos)")
    .nonnegative("O preço não pode ser negativo"),
  disponivel: z.boolean().optional().default(true),
});

export const atualizarItemSchema = criarItemSchema.partial();

export type CriarItemInput = z.infer<typeof criarItemSchema>;
export type AtualizarItemInput = z.infer<typeof atualizarItemSchema>;

export const idCardapioParamSchema = z.object({
  id: z.string().uuid("O formato do ID informado é inválido. Esperado um UUID."),
});

export const filtroItemQuerySchema = z.object({
  categoria_id: z.string().uuid("O formato do ID da categoria é inválido.").optional(),
});
