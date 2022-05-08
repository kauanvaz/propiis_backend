const mongoose = require('../../database');

const PropriedadeSchema = new mongoose.Schema({
    host: {
        nome: {type: String, require: true},
        telefone: {type: String, require: true},
        imagem_perfil: {type: String, require: true},
        id: {type: mongoose.Types.ObjectId, require: true}
    },
    titulo: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    fotos: [{
        type: String,
        require: true
    }],
    preco_diaria: {
        type: Number,
        require: true
    },
    taxa: {
        type: Number,
        require: true
    },
    quartos: {
        type: Number,
        require: true
    },
    banheiros: {
        type: Number,
        require: true
    },
    localizacao: {    
        endereco: {type: String, require: true},
        cidade: {type: String, require: true},
        estado: {type: String, require: true},
        coordinates: {type: Array, require: true},
        type: {type: String, default: "Point"}
    },
    reservada: {
        type: Boolean,
        default: false
    },
    avaliacoes: [{
        nome: {type: String},
        email: {type: String},
        id_user: {type: mongoose.Types.ObjectId},
        estrelas: {type: Number},
        comentario: {type: String},
    }]
});

const Propriedade = mongoose.model('propriedades', PropriedadeSchema);

module.exports = Propriedade;