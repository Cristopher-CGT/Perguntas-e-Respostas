// Model de Perguntas
const Sequelize = require("sequelize");
const { connection } = require("./database");

const Pergunta = connection.define("tb_pergunta", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// force = não ira forçar a criação da tabela se ela já existir
Pergunta.sync({ force: false });

module.exports = Pergunta;
