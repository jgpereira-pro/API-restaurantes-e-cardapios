import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { CadastroRestauranteInput, LoginRestauranteInput } from '../schemas/AuthSchema'

const SALT_ROUNDS = 10

export class AuthService {

  async cadastrar(dados: CadastroRestauranteInput) {
    const emailExistente = await prisma.restaurante.findUnique({
      where: { email: dados.email },
    })
    if (emailExistente) {
      throw new Error('E-mail já cadastrado.')
    }

    const cnpjExistente = await prisma.restaurante.findUnique({
      where: { cnpj: dados.cnpj },
    })
    if (cnpjExistente) {
      throw new Error('CNPJ já cadastrado.')
    }

    const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS)

    const restaurante = await prisma.restaurante.create({
      data: {
        nome: dados.nome,
        cnpj: dados.cnpj,
        email: dados.email,
        senha: senhaHash,
        endereco_logradouro: dados.endereco_logradouro,
        endereco_numero: dados.endereco_numero,
        endereco_bairro: dados.endereco_bairro,
        endereco_cidade: dados.endereco_cidade,
        endereco_cep: dados.endereco_cep,
      },
    })

    const { senha: _, ...restauranteSemSenha } = restaurante
    return restauranteSemSenha
  }

  async verificarCredenciais(dados: LoginRestauranteInput) {
    const restaurante = await prisma.restaurante.findUnique({
      where: { email: dados.email },
    })

    // Mensagem genérica para não revelar se o e-mail existe
    if (!restaurante) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const senhaCorreta = await bcrypt.compare(dados.senha, restaurante.senha)
    if (!senhaCorreta) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const { senha: _, ...restauranteSemSenha } = restaurante
    return restauranteSemSenha
  }
}
