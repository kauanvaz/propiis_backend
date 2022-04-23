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

// Pesquisa por cidade
router.get('/cidade/:cidade', async (req, res) => {
  try{
    const propriedades = await Propriedade.find({"localizacao.cidade":req.params.cidade, "reservada": false});
    return res.send({ propriedades })
  }catch(err){
    return res.status(400).send({error: 'Erro ao carregar as propriedades'});
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

router.put('/', async (req, res) => {

});

router.delete('/', async (req, res) => {

});

module.exports = app => app.use('/propriedades', router);