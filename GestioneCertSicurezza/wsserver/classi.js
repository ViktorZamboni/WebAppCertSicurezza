const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const config = require("./config.js");
const auth = require("./auth.js");

const service = express.Router();
service.use(bodyparser.json());
service.use(bodyparser.urlencoded({ extended: false }));

const parametriConnessioniDB = config.dbParams;

service.use(auth.auth);

// ======================================================================================================================================================

service.get("/", (request, response) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR = "SELECT * FROM classi";
  connessione.query(querySTR, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      response.json({
        message: "Lista classi",
        data: dati,
      });
    } else {
      response.status(500).json({ error: error});
    }
  });
});

// richiesta per ottenere tutte le classi dato un anno scolastico

service.get("/:fkannoscolastico", (req, res) => {
  let fkannoscolastico = req.params.fkannoscolastico;
  if (fkannoscolastico) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "SELECT nome, anno, sezione, indirizzo, descrizione, datainizio, datafine  FROM classi JOIN classistudenti ON classistudenti.fkclasse = classi.nome WHERE fkannoscolastico = ?";
    connessione.query(querySTR, fkannoscolastico, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Lista classi",
          data: data,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  }
});

service.get("/id/:nome", (req, res) => {
  let nome = req.params.nome;
  if (nome) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM classi WHERE nome = ?",
      nome,
      (err, data) => {
        connessione.end(() => {});
        if (!err) {
          res.json({
            message: "Lista abilitazioni",
            data: data,
          });
        } else {
          res.status(500).json({ error: err });
        }
      }
    );
  } else {
    res.send("Parametro inesistente");
  }
});

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO classi (nome, anno, sezione, indirizzo, descrizione) VALUES (?, ?, ?, ?, ?)";
  let nuovaClasse = [
    req.body.nome,
    req.body.anno,
    req.body.sezione,
    req.body.indirizzo,
    req.body.descrizione,
  ];

  connessione.query(querySTR, nuovaClasse, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        message: "Classe inserita correttamente",
        data: dati,
      });
    } else {
      res.status(500).json({ error: error});
    }
  });
});

service.put("/nome/:nome", (req, res) => {
  let nome = req.params.nome;
  if (nome) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "UPDATE classi SET nome = ?, anno = ?, sezione = ?, indirizzo = ?, descrizione = ? WHERE nome = ?";
    let classeModificata = [
      req.body.nome,
      req.body.anno,
      req.body.sezione,
      req.body.indirizzo,
      req.body.descrizione,
      nome,
    ];
    connessione.query(querySTR, classeModificata, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Classe modificata correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  } else {
    res.status(400).json({ error: "Nome non valido"});
  }
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;
  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized"});
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM classi";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Tutte le classi sono state eliminate correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  }
});

service.delete("/nome/:nome", (req, res) => {
  let nome = req.params.nome;
  if (nome) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR = "DELETE FROM classi WHERE nome = ?";
    let classeDaEliminare = [nome];
    connessione.query(querySTR, classeDaEliminare, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Classe eliminata correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  } else {
    res.status(400).json({ error: "Nome non valido"});
  }
});

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO classi (nome, anno, sezione, indirizzo, descrizione) VALUES ?";
  let classi = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(classi)) {
    let nuoveClassi = classi.map((classe) => [
      classe.nome,
      classe.anno,
      classe.sezione,
      classe.indirizzo,
      classe.descrizione,
    ]);
    connessione.query(querySTR, [nuoveClassi], (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error});
      } else {
        res.json({
          message: "Classi inserite correttamente",
          data: dati,
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
