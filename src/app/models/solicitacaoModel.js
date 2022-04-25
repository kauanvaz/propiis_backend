const mongoose = require('../../database');

const SolicitacaoSchema = new mongoose.Schema({
    status: {
        type: String,
        default: "Pendente",
    },
    user: {
        nome: {type: String, require: true},
        telefone: {type: String, require: true},
        imagem_perfil: {type: String, require: true},
        id: {type: mongoose.Types.ObjectId, require: true}
    },
    user_host: {
        nome: {type: String, require: true},
        telefone: {type: String, require: true},
        imagem_perfil: {type: String, require: true},
        id: {type: mongoose.Types.ObjectId, require: true}
    },
    propriedade: {
        titulo: {type: String, require: true},
        fotos: [{type: String, require: true}],
        localizacao: {
            endereco: {type: String, require: true}, 
            cidade: {type: String, require: true}, 
            estado:{type: String, require: true}
        },
        id: {type: mongoose.Types.ObjectId, require: true}
    },
    periodo: {
        inicio: {type: Date, require: true},
        fim: {type: Date, require: true}
    },
    valor_total: {
        type: Number,
        require: true
    }
});

const Solicitacao = mongoose.model('solicitacoes', SolicitacaoSchema);

module.exports = Solicitacao;