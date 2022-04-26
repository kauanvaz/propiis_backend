const express = require('express'); 

const Propriedade = require('../models/propriedadeModel');

const router = express.Router();

// pesquisa de propriedade única
router.get('/unica/:id', async (req, res) => {
  try{
    const propriedades = await Propriedade.find({"_id":req.params.id});
    return res.send({ propriedades })
  }catch(err){
    return res.status(400).send({error: 'Erro ao carregar as propriedades'});
  }
});

// pesquisa por cidade
router.get('/cidade/:cidade', async (req, res) => {
  try{
    const propriedades = await Propriedade.find({"localizacao.cidade":req.params.cidade, "reservada": false});
    return res.send({ propriedades })
  }catch(err){
    return res.status(400).send({error: 'Erro ao carregar as propriedades'});
  }
});

router.post('/', async (req, res) => {

});

router.put('/:projectId', async (req, res) => {

});

router.delete('/:projectId', async (req, res) => {

});

module.exports = app => app.use('/propriedades', router);