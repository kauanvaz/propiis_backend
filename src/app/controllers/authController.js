const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken (params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

// Recupera um usuário
router.get('/:idUser', async (req, res) => {
    try{
      const user = await User.findById(req.params.idUser);
  
      return res.send({ user });
    }catch(err){
      return res.status(400).send({error: 'Erro ao recuperar informações do usuário.'}); 
    }
});

router.post('/register', async (req,res) => { // ROTA DE REGISTRO
    try {
        const user = await User.create(req.body);
        return res.send({ user,
            token: generateToken({id: user.id}),
        });
    } catch (err) {
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.post('/authenticate', async (req, res)=> { // ROTA DE AUTENTICACAO
    const {email, senha} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'User not found'});

    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({error: 'Invalid password'});

    user.password = undefined;

    const token = jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: 86400,
    }); 

    res.send({
        user, 
        token: generateToken({id: user.id}),
    });

});

// Avaliar cliente
router.put('/avaliar/:idUser', async (req, res) => {
    const { avaliacao } = req.body
  
    try{
        const u = await User.findById(req.params.idUser);

        let aval_geral = (u.avaliacoes.reduce((soma, i) => {
          return soma + i.estrelas;
        }, 0)+avaliacao.estrelas)/(u.avaliacoes.length+1)

        const user = await User.findByIdAndUpdate(req.params.idUser, {
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
  
        return res.send({ user });
    }catch(err) {
          return res.status(400).send({error: "Erro ao avaliar usuário."})
    }
});

module.exports = app => app.use('/auth', router);