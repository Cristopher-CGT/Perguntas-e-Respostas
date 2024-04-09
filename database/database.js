const Sequelize = require("sequelize");
const dotenv = require("dotenv");

// Para conseguir utilizar as variaveis do .env
dotenv.config();

// Substitua as "${process.env}" pelo nome do seu banco de dados, nome do usuário do workbench e a senha do seu usuário no workbench
const connection = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.HOST_NAME}`,
  `${process.env.HOST_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

async function connect(connection) {
  try {
    await connection.authenticate();
    await console.log("Conectado");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect, connection };
