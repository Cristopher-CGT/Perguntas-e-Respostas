// Model de Respostas
const Sequelize = require("sequelize");
const { connection } = require("./database");

const Resposta = connection.define("tb_respostas", {
  resposta: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  pergunta_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });

module.exports = Resposta;
