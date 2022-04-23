const mongoose = require('../../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
    },
    cpf:{
        type: String,
        unique: true,
        require: true,
        selected: false,
    },
    telefone:{
        type: String,
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
    tipo_user: {
        type: String,
        require: true
    },
    imagem_perfil: {
        type: String,
        default: "https://tunasunggul.sekolahk2.id:4343/pluginfile.php/1/theme_moove/marketing3icon/1644803449/kisspng-user-account-rsum-curriculum-vitae-europe-5b3d098f90a986.8282603915307267995926.png"
    }
});

UserSchema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;