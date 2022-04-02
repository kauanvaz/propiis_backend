const mongoose = require('../../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    nome:{
        type: String,
        require: true,
    },
    cpf:{
        type: Number,
        unique: true,
        require: true,
        selected: false,
    },
    telefone:{
        type: Number,
        unique: true,
        require: true,
        selected: false,
    },

    email:{
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },

    senha:{
        type: String,
        require: true,
        selected: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,

    },
});

UserSchema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;