const express = require('express'); 

const Solicitacao = require('../models/solicitacaoModel');
const Propriedade = require('../models/propriedadeModel');

const router = express.Router();

// Recuperação da lista de solicitações de reserva do usuário comum
router.get('/recuperar/usuario', async (req, res) => { 
    try{
        let id = req.query.id;
        let status = req.query.status;

        const solicitacoes = await Solicitacao.find({"user.id": id, "status": status});
            
        return res.send({ solicitacoes })
      }catch(err){
        return res.status(400).send({error: 'Erro ao carregar as solicitações.'});
    }
});

// Recuperação da lista de solicitações de reserva do host
router.get('/recuperar/host', async (req, res) => { 
    try{
        let id = req.query.id;
        let status = req.query.status;

        const solicitacoes = await Solicitacao.find({"user_host.id": id, "status": status});
            
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

// Aceitar/recusar solicitação de reserva
router.put('/:idSolicitacao', async (req, res) => {
    const { status } = req.body

    try{
        const solicitacao = await Solicitacao.findByIdAndUpdate(req.params.idSolicitacao, {
            status
        }, { new: true });

        if (status === "Aceita") {
            await Propriedade.findByIdAndUpdate(String(solicitacao.propriedade.id), {
                reservada:true
            });
        }

        return res.send({ solicitacao });
    }catch(err) {
        return res.status(400).send({error: "Erro ao aceitar/recusar reserva."})
    }
});

router.delete('/', async (req, res) => {

});

module.exports = app => app.use('/solicitacoes', router);