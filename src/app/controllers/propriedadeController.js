const express = require('express'); 

const Propriedade = require('../models/propriedadeModel');
const Solicitacao = require('../models/solicitacaoModel');

const router = express.Router();

// pesquisa de propriedade única
router.get('/unica/:id', async (req, res) => {
  try{
    const propriedades = await Propriedade.find({"_id":req.params.id});
    return res.send({ propriedades })
  }catch(err){
    return res.status(400).send({error: 'Erro ao carregar propriedade'});
  }
});

// Pesquisa por cidade, e periodo
router.get('/cidade', async (req, res) => {
  try{
    let cidade = req.query.cidade;
    let inicio = (new Date(req.query.inicio)).getTime();
    let fim = (new Date(req.query.fim)).getTime();

    const todas_propri = await Propriedade.find({"localizacao.cidade":cidade});

    let propriedades = todas_propri.filter(function (e) {
      return e.reservada === false;
    });

    if (propriedades.length !== todas_propri.length) {
      //const reservadas = await Propriedade.find({"localizacao.cidade":req.params.cidade, "reservada":true});

      const solicitacoes = await Solicitacao.find({"propriedade.localizacao.cidade":cidade, "status":"Aceita"})

      for (var i = 0; i < solicitacoes.length; i++) {
        const r_inicio = solicitacoes[i].periodo.inicio.getTime();
        const r_fim = solicitacoes[i].periodo.fim.getTime()

        if ((inicio >= r_inicio && inicio <= r_fim) || (fim <= r_fim && fim >= r_inicio) || (inicio <= r_inicio && fim >= r_fim)){
          break;
        }else {
          propriedades.push(await Propriedade.findById(String(solicitacoes[i].propriedade.id)))
        }
      }
    }

    return res.send({ propriedades })
  }catch(err){
    return res.status(400).send({error: 'Erro ao carregar as propriedades'});
  }
});

// Recupera avaliação de um usuário
router.get('/avaliacao', async (req, res) => {
  let propri = req.query.propriedade;
  let user = req.query.user

  try{
    const propriedade = await Propriedade.findById(propri);

    let avaliacao = propriedade.avaliacoes.filter(function (e) {
      return String(e.id_user) === user;
    });

    return res.send({ avaliacao });
  }catch(err){
    return res.status(400).send({error: 'Erro ao recuperar avaliação.'}); 
  }
});

router.post('/cadastrar', async (req, res) => {
  try{
    const propriedade = await Propriedade.create(req.body);
    return res.send({ propriedade });
  }catch(err){
    return res.status(400).send({error: 'Erro ao cadastrar propriedade.'}); 
  }
});

router.post('/cadastrarVarias', async (req, res) => {
  try{
    const propriedades = await Propriedade.insertMany(req.body);
    return res.send({ propriedades });
  }catch(err){
    return res.status(400).send({error: 'Erro ao cadastrar propriedades.'}); 
  }
});

// Avaliar propriedade
router.put('/avaliar/:idPropriedade', async (req, res) => {
  const { avaliacao } = req.body

    try{
      const prop = await Propriedade.findById(req.params.idPropriedade);

      let aval_geral = (prop.avaliacoes.reduce((soma, i) => {
        return soma + i.estrelas;
      }, 0)+avaliacao.estrelas)/(prop.avaliacoes.length+1)

      const propriedade = await Propriedade.findByIdAndUpdate(req.params.idPropriedade, {
        $push: {
          avaliacoes: {
            $each: [
              avaliacao
            ],
            $position: 0
          }
        },
        avaliacao_geral: aval_geral
      }, { new: true });

        return res.send({ propriedade });
    }catch(err) {
        return res.status(400).send({error: "Erro ao avaliar propriedade."})
    }
});

router.delete('/', async (req, res) => {

});

module.exports = app => app.use('/propriedades', router);