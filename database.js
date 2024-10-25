// Importa o módulo sqlite3 e ativa o modo verbose, que fornece informações mais detalhadas de depuração.
const sqlite3 = require('sqlite3').verbose();

// Cria uma nova instância do banco de dados SQLite, apontando para o arquivo 'database.db'.
// Se o arquivo não existir, ele será criado automaticamente.
const db = new sqlite3.Database('silvio_api/database.db');

// O  serialize() garante que as operações dentro dele serão executadas de forma sequencial.
db.serialize(() => {

  // Cria a tabela "disciplinas" se ela ainda não existir.
  db.run(`
    CREATE TABLE IF NOT EXISTS disciplinas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,   // Campo "id" como chave primária que se auto-incrementa.
      nome TEXT NOT NULL                      // Campo "nome" que deve ser preenchido (não pode ser nulo).
    )
  `);

  // Cria a tabela "usuario" se ela ainda não existir.
  db.run(`
    CREATE TABLE IF NOT EXISTS usuario(
      id INTEGER PRIMARY KEY AUTOINCREMENT,   // Campo "id" como chave primária que se auto-incrementa.
      nome TEXT NOT NULL,                     // Campo "nome" que deve ser preenchido.
      email TEXT NOT NULL UNIQUE,             // Campo "email" que deve ser único
      senha REAL NOT NULL                     // Campo "senha"
    )
  `);

  // Cria a tabela "jogos" se ela ainda não existir.
  // A tabela tem dois campos: "id" (chave primária auto-incrementada) e "nome" (texto, não nulo).
  db.run(`
    CREATE TABLE IF NOT EXISTS jogos(
      id INTEGER PRIMARY KEY AUTOINCREMENT,   // Campo "id" como chave primária que se auto-incrementa.
      nome TEXT NOT NULL                      // Campo "nome" que deve ser preenchido.
    )
  `);
});

// Exporta a instância do banco de dados para que possa ser usada em outros arquivos do projeto.
module.exports = db;