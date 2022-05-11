const app = require("../src/index");
const request = require("supertest");
const solicitacoesData = require('../mock-tests/data/solicitacoes.json');
const fs = require('fs');
const mongoose = require('../src/database/index');

describe("Inserção de solicitação", () => {
    afterAll(() => {
        while (solicitacoesData.length > 0) {
            solicitacoesData.pop();
        }
        fs.writeFileSync('mock-tests/data/solicitacoes.json', JSON.stringify(solicitacoesData));
        mongoose.disconnect();
    });

    it("Solicitação de reserva com sucesso", async () => {
        user = {
            "nome": "user1",
            "cpf": "1111111111",
            "telefone": "111111111111",
            "email": "user1@gmail.com",
            "senha": "111111",
            "tipo_user": "usuario"
        }

        host = {
            "nome": "user2",
            "cpf": "2222222222",
            "telefone": "222222222222",
            "email": "user2@gmail.com",
            "senha": "222222",
            "tipo_user": "host"
        }

        propriedade = {
            "host": host,
            "titulo": "título",
            "descricao": "descrição",
            "fotos": ["foto1.jpg", "foto2.jpg"],
            "preco_diaria": 100,
            "taxa": 0.1,
            "quartos": 1,
            "banheiros": 1,
            "localizacao": {    
                "endereco": "bairro - número",
                "cidade": "cidade",
                "estado": "estado",
                "coordinates": ["23.005859","-5.058414"]
            },
            "reservada": false
        }

        solicitacao = {
            "user": user,
            "user_host": host,
            "propriedade": propriedade,
            "periodo": new Date("2022-10-10"),
            "valor_total": 500
        }

        const res = await request(app).post('/teste-solicitacao/cadastrar').send(solicitacao);

        expect(res.status).toBe(200);
    });
})