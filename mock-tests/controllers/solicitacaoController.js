const fs = require('fs');
const { nanoid } = require('nanoid');

const express = require('express'); 
const router = express.Router();

const solicitacoesData = require('../data/solicitacoes.json');

router.post('/cadastrar', (req, res) => {
    try{
        const { user, user_host, propriedade, periodo, valor_total } = req.body;

        const novaSolicitacao = {
            "id": nanoid(),
            "status": "Pendente",
            "user": user,
            "user_host": user_host,
            "propriedade": propriedade,
            "periodo": periodo,
            "valor_total": valor_total,
            "pago": false
        };

        solicitacoesData.push(novaSolicitacao);
        fs.writeFileSync('mock-tests/data/solicitacoes.json', JSON.stringify(solicitacoesData));

        res.status(200).send(novaSolicitacao);
    }catch(err){
        return res.status(400).send({error: 'Erro ao solicitar reserva.'}); 
    }
});

exports.post = (req, res, next) => {
  
};

exports.get = (req, res, next) => {
  // Envia a resposta com todos os usuários
  res.status(200).send(usersData);
}

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

module.exports = app => app.use('/teste-solicitacao', router);