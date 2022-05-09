const express = require('express');
const bcrypt  = require('bcrypt');
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

module.exports = app => app.use('/auth', router);