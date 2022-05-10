const app = require("../src/index");
const request = require("supertest");

describe("Inserção de usuários", () => {
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