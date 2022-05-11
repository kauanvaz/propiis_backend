const fs = require('fs');
const { nanoid } = require('nanoid');

const express = require('express'); 
const router = express.Router();

const usersData = require('../data/users.json');

router.post('/cadastrar', (req, res) => {
    try{
        const { nome, cpf, telefone, email, senha, tipo_user} = req.body;

        const novoUsuario = {
            "id": nanoid(),
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "email": email,
            "senha": senha,
            "tipo_user": tipo_user
        };

        usersData.push(novoUsuario);
        fs.writeFileSync('mock-tests/data/users.json', JSON.stringify(usersData));

        res.status(200).send(novoUsuario);
    }catch(err){
        return res.status(400).send({error: 'Erro ao cadastrar usuario.'}); 
    }
});

exports.delete = (req, res, next) => {
  // ID do usuário recebido na URL
  const id = req.params.id;

  // Busca o usuário pelo ID fornecido na requisição
  // const resultados = usersData.filter((user) => user.id == id);
  const resultadoIndex = usersData.findIndex((user) => user.id == id);

  // Valida se o usuário existe
  if (resultadoIndex == -1) {
    res.status(404).send({'mensagem': 'O usuário a ser deletado não existe.'});
    return;
  }

  // Remove o usuário
  usersData.splice(resultadoIndex, 1);
  fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));

  // Envia a resposta
  res.status(200).send({'mensagem': 'Usuário deletado.'});
};

module.exports = app => app.use('/teste-user', router);