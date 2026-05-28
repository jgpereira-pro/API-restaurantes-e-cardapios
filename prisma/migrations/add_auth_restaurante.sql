-- Migração: Adicionar campos de autenticação à tabela restaurantes
-- Executar com um usuário que tenha permissão ALTER TABLE no banco

ALTER TABLE restaurantes
  ADD COLUMN email VARCHAR(150) NOT NULL DEFAULT '' AFTER cnpj,
  ADD COLUMN senha VARCHAR(255) NOT NULL DEFAULT '' AFTER email,
  ADD UNIQUE INDEX idx_restaurantes_email (email);
