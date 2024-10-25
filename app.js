// Importa o módulo express para criar o servidor e definir rotas.
const express = require('express');

// Importa o sqlite e linka com o arquivo main
const db = require('./database');

// Cria a aplicação Express.
const app = express();
// Define a porta na qual o servidor vai rodar.
const port = 3000;

// Middleware para permitir que o servidor processe requisições com dados em JSON.
app.use(express.json());
/**
 * Rotas para a tabela "disciplinas"
 */

// Rota POST para adicionar uma nova disciplina.
app.post('/disciplinas', (req, res) => {
    // Extrai o campo "nome" do corpo da requisição.
    const { nome } = req.body;

    // Insere a nova disciplina na tabela "disciplinas".
    db.run("INSERT INTO disciplinas (nome) VALUES (?)", [nome], function(err){
        if (err) {
            // Retorna uma resposta de erro (status 400) caso haja algum problema na inserção.
            return res.status(400).json({ error: err.message });
        }
        // Retorna o ID da nova disciplina criada.
        res.status(201).json({ id: this.lastID });
    });
});

// Rota GET para listar todas as disciplinas.
app.get('/disciplinas', (req, res) => {
    // Executa uma query para selecionar todas as disciplinas da tabela.
    db.all("SELECT * FROM disciplinas", [], (err, rows) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema ao buscar os dados.
            return res.status(400).json({ error: err.message });
        }
        // Retorna todas as disciplinas encontradas.
        res.json(rows);
    });
});

// Rota GET para buscar uma disciplina específica por ID.
app.get('/disciplinas/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para buscar uma disciplina específica com o ID fornecido.
    db.get("SELECT * FROM disciplinas WHERE id = ?", [id], (err, row) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na busca.
            return res.status(400).json({ error: err.message });
        }
        // Retorna os dados da disciplina encontrada.
        res.json(row);
    });
});

// Rota PUT para atualizar uma disciplina existente.
app.put('/disciplinas/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Extrai o campo "nome" do corpo da requisição.
    const { nome } = req.body;

    // Executa uma query para atualizar o nome da disciplina com o ID fornecido.
    db.run("UPDATE disciplinas SET nome = ? WHERE id = ?", [nome, id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na atualização.
            return res.status(400).json({ error: err.message });
        }

        // Retorna o número de linhas alteradas 
        res.json({ updated: this.changes });
    });
});

// Rota DELETE para remover uma disciplina pelo ID.
app.delete('/disciplinas/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para deletar a disciplina com o ID fornecido.
    db.run("DELETE FROM disciplinas WHERE id = ?", [id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na deleção.
            return res.status(400).json({ error: err.message });
        }

        // Retorna o número de linhas deletadas 
        res.json({ deleted: this.changes });
    });
});

/**
 * Rotas para a tabela "jogos"
 */

// Rota POST para adicionar um novo jogo.
app.post('/jogos', (req, res) => {
    // Extrai o campo "nome" do corpo da requisição.
    const { nome } = req.body;

    // Insere o novo jogo na tabela "jogos".
    db.run("INSERT INTO jogos (nome) VALUES (?)", [nome], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso haja algum problema na inserção.
            return res.status(400).json({ error: err.message });
        }l
        // Retorna o ID do novo jogo criado.
        res.status(201).json({ id: this.lastID });
    });
});

// Rota GET para listar todos os jogos.
app.get('/jogos', (req, res) => {
    // Executa uma query para selecionar todos os jogos da tabela.
    db.all("SELECT * FROM jogos", [], (err, rows) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema ao buscar os dados.
            return res.status(400).json({ error: err.message });
        }

        // Retorna todos os jogos encontrados.
        res.json(rows);
    });
});

// Rota GET para buscar um jogo específico por ID.
app.get('/jogos/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para buscar um jogo específico com o ID fornecido.
    db.get("SELECT * FROM jogos WHERE id = ?", [id], (err, row) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na busca.
            return res.status(400).json({ error: err.message });
        }
        // Retorna os dados do jogo encontrado.
        res.json(row);
    });
});

// Rota PUT para atualizar um jogo existente.
app.put('/jogos/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Extrai o campo "nome" do corpo da requisição.
    const { nome } = req.body;

    // Executa uma query para atualizar o nome do jogo com o ID fornecido.
    db.run("UPDATE jogos SET nome = ? WHERE id = ?", [nome, id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na atualização.
            return res.status(400).json({ error: err.message });
        }

        // Retorna o número de linhas alteradas 
        res.json({ updated: this.changes });
    });
});

// Rota DELETE para remover um jogo pelo ID.
app.delete('/jogos/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para deletar o jogo com o ID fornecido.
    db.run("DELETE FROM jogos WHERE id = ?", [id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na deleção.
            return res.status(400).json({ error: err.message });
        }
        // Retorna o número de linhas deletadas (deve ser 1 se a deleção for bem-sucedida).
        res.json({ deleted: this.changes });
    });
});

/**
 * Rotas para a tabela "usuario"
 */

// Rota POST para adicionar um novo usuário.
app.post('/usuario', (req, res) => {
    // Extrai os campos "nome", "email" e "senha" do corpo da requisição.
    const { nome, email, senha } = req.body;

    // Insere o novo usuário na tabela "usuario".
    db.run("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso haja algum problema na inserção.
            return res.status(400).json({ error: err.message });
        }

        // Retorna o ID do novo usuário criado.
        res.status(201).json({ id: this.lastID });
    });
});

// Rota GET para listar todos os usuários.
app.get('/usuario', (req, res) => {
    // Executa uma query para selecionar todos os usuários da tabela.
    db.all("SELECT * FROM usuario", [], (err, rows) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema ao buscar os dados.
            return res.status(400).json({ error: err.message });
        }

        // Retorna todos os usuários encontrados.
        res.json(rows);
    });
});

// Rota GET para buscar um usuário específico por ID.
app.get('/usuario/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para buscar um usuário específico com o ID fornecido.
    db.get("SELECT * FROM usuario WHERE id = ?", [id], (err, row) => {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na busca.
            return res.status(400).json({ error: err.message });
        }

        // Retorna os dados do usuário encontrado.
        res.json(row);
    });
});

// Rota PUT para atualizar um usuário existente.
app.put('/usuario/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Extrai os campos "nome", "email" e "senha" do corpo da requisição.
    const { nome, email, senha } = req.body;

    // Executa uma query para atualizar o nome, email e senha do usuário com o ID fornecido.
    db.run("UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?", [nome, email, senha, id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na atualização.
            return res.status(400).json({ error: err.message });
        }
        // Retorna o número de linhas alteradas (deve ser 1 se o update for bem-sucedido).
        res.json({ updated: this.changes });
    });
});

// Rota DELETE para remover um usuário pelo ID.
app.delete('/usuario/:id', (req, res) => {
    // Extrai o ID dos parâmetros da URL.
    const { id } = req.params;

    // Executa uma query para deletar o usuário com o ID fornecido.
    db.run("DELETE FROM usuario WHERE id = ?", [id], function(err) {
        if (err) {
            // Retorna uma resposta de erro caso ocorra algum problema na deleção.
            return res.status(400).json({ error: err.message });
        }

        // Retorna o número de linhas deletadas
        res.json({ deleted: this.changes });
    });
});

// Inicia o servidor e imprime uma mensagem no console.
app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:${port}");
});