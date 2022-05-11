const app = require("../src/index");
const request = require("supertest");
const usersData = require('../mock-tests/data/users.json');
const fs = require('fs');
const mongoose = require('../src/database/index');

describe("Inserção de usuários", () => {
    afterAll(() => {
        while (usersData.length > 0) {
            usersData.pop();
        }
        fs.writeFileSync('mock-tests/data/users.json', JSON.stringify(usersData));
        mongoose.disconnect();
    });

    it("Inserção com sucesso de um usuário", async () => {
        const res = await request(app).post('/teste-user/cadastrar').send({
            "nome": "user1",
            "cpf": "1111111111",
            "telefone": "111111111111",
            "email": "user1@gmail.com",
            "senha": "111111",
            "tipo_user": "usuario"
        });

        expect(res.status).toBe(200);
    });
})