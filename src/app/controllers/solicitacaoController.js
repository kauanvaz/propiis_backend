const express = require('express'); 

const Solicitacao = require('../models/solicitacaoModel');

const router = express.Router();

// Recuperação da lista de solicitações de reserva
router.get('/recuperar/:id_user', async (req, res) => { 
    try{
        const solicitacoes = await Solicitacao.find({"user.id":req.params.id_user});
        return res.send({ solicitacoes })
      }catch(err){
        return res.status(400).send({error: 'Erro ao carregar as solicitações.'});
    }
});

// Solicitação de reserva
router.post('/solicitar', async (req, res) => {
    try {          
        const solicitacao = await Solicitacao.create(req.body);
        return res.send({ solicitacao });
    } catch (err) {
        return res.status(400).send({error: 'Erro ao fazer solicitação de reserva.'});       
    }
});

router.put('/', async (req, res) => {

});

router.delete('/', async (req, res) => {

});

module.exports = app => app.use('/solicitacoes', router);