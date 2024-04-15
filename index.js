const express = require("express");
const server = express();

const perguntaModel = require("./database/Perguntas");
const respostaModel = require("./database/Resposta");
const { connection, connect } = require("./database/database");

// Conexão com o banco de dados
connect(connection);

// Middlewares
server.set("view engine", "ejs");
server.use(express.static("public"));

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Pagina principal
server.get("/", async (req, res) => {
  let perguntas = await perguntaModel.findAll({
    raw: true, // Apenas os dados da tabela
    order: [["id", "DESC"]], // ordenar pelo maior id
  });

  res.status(200).render("index.ejs", {
    perguntas: perguntas,
  });
});

// Pagina de pergunta
server.get("/perguntar", (req, res) => {
  res.status(200).render("perguntar.ejs");
});

// Visualizar todas as respostas e a pergunta
server.get("/perguntar/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let pergunta_id = await perguntaModel.findOne({
      where: { id: id },
    });

    if (pergunta_id == undefined) {
      res.redirect("/");
    }

    let respostas = await respostaModel.findAll({
      where: { pergunta_id: id },
      order: [["id", "DESC"]],
    });

    res.status(200).render("resposta", {
      pergunta: pergunta_id,
      respostas: respostas,
    });
  } catch (error) {}
});

// Salvar a pergunta realizada
server.post("/salvarpergunta", async (req, res) => {
  try {
    let titulo = await req.body.titulo;
    let desc = await req.body.descricao;

    await perguntaModel.create({
      titulo: titulo,
      descricao: desc,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// Responder a pergunta
server.post("/responder", async (req, res) => {
  try {
    let resposta = await req.body.resposta;
    let id_pergunta = await req.body.id_pergunta;

    await respostaModel.create({
      resposta: resposta,
      pergunta_id: id_pergunta,
    });

    res.status(200).redirect(`/perguntar/${id_pergunta}`);
  } catch (error) {}
});

server.listen(3000, () => {
  console.log("Server Started");
});
