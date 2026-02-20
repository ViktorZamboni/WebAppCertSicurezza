const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const config = require("./config.js");
const auth = require("./auth.js");

const parametriConnessioniDB = config.dbParams;

const service = express.Router();
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

service.use(auth.auth);

// ======================================================================================================================================================

service.get("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  connessione.query("SELECT * FROM formatori", (error, data) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: data,
        message: "Lista formatori",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let nuovoInserimento = [req.body.nome, req.body.cognome];
  const sql = "INSERT INTO formatori(nome, cognome) VALUES (?, ?)";
  connessione.query(sql, nuovoInserimento, (error, data) => {
    connessione.end();
    if (!error) {
      res.json({
        data: data,
        message: "Formatore inserito correttamente",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

service.get("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM formatori WHERE id = ?",
      id,
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


service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM formatori";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutti i formatori sono stati eliminati correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

service.delete("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql = "DELETE FROM formatori WHERE id = ?";
    connessione.query(sql, id, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Formatore eliminato correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.put("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    let nuovoInserimento = [req.body.nome, req.body.cognome, id];
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql = "UPDATE formatori SET nome = ?, cognome = ? WHERE id = ?";
    connessione.query(sql, nuovoInserimento, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Formatore modificato correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR = "INSERT INTO formatori (nome, cognome) VALUES ?";
  let formatori = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(formatori)) {
    let nuoviFormatori = formatori.map((formatore) => [
      formatore.nome,
      formatore.cognome,
    ]);
    connessione.query(querySTR, [nuoviFormatori], (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Formatori inseriti correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
