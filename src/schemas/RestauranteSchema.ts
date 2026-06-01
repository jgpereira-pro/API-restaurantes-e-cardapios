import { z } from 'zod';

export const criarRestauranteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  cnpj: z.string().length(14, "O CNPJ deve ter exatamente 14 dígitos"),
  endereco_logradouro: z.string(),
  endereco_numero: z.string(),
  endereco_bairro: z.string(),
  endereco_cidade: z.string(),
  endereco_cep: z.string().length(8, "O CEP deve ter 8 dígitos"),
  tipo:      z.string().optional(),
  descricao: z.string().optional(),
  telefone:  z.string().optional(),
  imagem:    z.string().optional(),
  capa:      z.string().optional(),
  status:    z.enum(['ABERTO', 'FECHADO', 'INATIVO']).optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid("O formato do ID informado é inválido. Esperado um UUID."),
});

export type CriarRestauranteInput = z.infer<typeof criarRestauranteSchema>;

export const atualizarRestauranteSchema = criarRestauranteSchema.partial();

export type AtualizarRestauranteInput = z.infer<typeof atualizarRestauranteSchema>;