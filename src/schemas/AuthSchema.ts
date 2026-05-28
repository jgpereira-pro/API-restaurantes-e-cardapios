import { z } from 'zod'

export const cadastroRestauranteSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cnpj: z.string().length(14, 'O CNPJ deve ter exatamente 14 dígitos (sem pontuação)'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  endereco_logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  endereco_numero: z.string().min(1, 'Número é obrigatório'),
  endereco_bairro: z.string().min(1, 'Bairro é obrigatório'),
  endereco_cidade: z.string().min(1, 'Cidade é obrigatória'),
  endereco_cep: z.string().length(8, 'O CEP deve ter 8 dígitos (sem hífen)'),
})

export const loginRestauranteSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
})

export type CadastroRestauranteInput = z.infer<typeof cadastroRestauranteSchema>
export type LoginRestauranteInput = z.infer<typeof loginRestauranteSchema>
