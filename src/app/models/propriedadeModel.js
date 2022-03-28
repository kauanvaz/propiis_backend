const mongoose = require('../../database');

const PropriedadeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,
    },
    descricao: {
        type: String,
        unique: true,
        require: true,
    },
    fotos: [{
        type: String,
        require: true,
    }],
    preco_diaria: {
        type: Number,
        require: true,
    },
    taxa: {
        type: Number,
        require: true,
    },
    quartos: {
        type: Number,
        require: true,
    },
    banheiros: {
        type: Number,
        require: true,
    },
    localizacao: {
        type: Object,
        require: true,
    },
    proprietario: {
        type: Object,
        require: true,
    }
});

const Propriedade = mongoose.model('propriedades', PropriedadeSchema);

module.exports = Propriedade;