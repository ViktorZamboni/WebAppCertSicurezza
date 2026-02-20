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
  connessione.query("SELECT * FROM logs", (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        data: data,
        message: "Lista logs",
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
});

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let nuovoInserimento = [req.body.datetime, req.body.descrizione];
  const sql = "INSERT INTO logs(datetime, descrizione) VALUES (?, ?)";
  connessione.query(sql, nuovoInserimento, (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        data: data,
        message: "Log inserito correttamente",
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
});

service.delete("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql = "DELETE FROM logs WHERE id = ?";
    connessione.query(sql, id, (err, data) => {
      connessione.end(() => {});
      if (!err) {
        res.json({
          data: data,
          message: "Log eliminato correttamente",
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM logs";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutti i logs sono stati eliminati correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

service.put("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql = "UPDATE logs SET datetime = ?, descrizione = ? WHERE id = ?";
    let nuovoInserimento = [
      req.body.datetime,
      req.body.descrizione,
      req.params.id,
    ];
    connessione.query(sql, nuovoInserimento, (err, data) => {
      connessione.end(() => {});
      if (!err) {
        res.json({
          data: data,
          message: "Log modificato correttamente",
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

module.exports = service;
