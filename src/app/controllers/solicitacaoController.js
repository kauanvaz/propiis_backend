const express = require('express'); 

const Solicitacao = require('../models/solicitacaoModel');
const Propriedade = require('../models/propriedadeModel');

const router = express.Router();

// Recuperação de solicitação de reserva única
router.get('/:id', async (req, res) => { 
    try{
        const solicitacao = await Solicitacao.findById(req.params.id);
            
        return res.send({ solicitacao })
      }catch(err){
        return res.status(400).send({error: 'Erro ao carregar solicitação.'});
    }
})

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

// Pagar reserva
router.put('/pagamento/:idSolicitacao', async (req, res) => {
    const { pago } = req.body

    try{
        const solicitacao = await Solicitacao.findByIdAndUpdate(req.params.idSolicitacao, {
            pago
        }, { new: true });

        return res.send({ solicitacao });
    }catch(err) {
        return res.status(400).send({error: "Erro ao pagar reserva."})
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Solicitacao.findByIdAndRemove(req.params.id);
        return res.send();
    }catch(err) {
        return res.status(400).send({error: "Erro ao cancelar solicitação."})
    }
});;

module.exports = app => app.use('/solicitacoes', router);