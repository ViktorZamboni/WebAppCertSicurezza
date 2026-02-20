const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
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
  connessione.query("SELECT * FROM utenti", (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        message: "Lista utenti",
        data: data,
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
});

service.get("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM utenti WHERE id = ?",
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

// NB: lo username è univoco
service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let nuovoInserimento = [
    req.body.nome,
    req.body.cognome,
    req.body.username,
    req.body.password,
    req.body.lastlogin,
    req.body.enabled,
    req.body.ruolo
  ];
  nuovoInserimento[3] = bcrypt.hashSync(nuovoInserimento[3], 10);
  const sql =
    "INSERT INTO utenti(nome, cognome, username, password, lastlogin, enabled, ruolo) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connessione.query(sql, nuovoInserimento, (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        message: "Utente inserito correttamente",
        data: data,
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
    const sql = "DELETE FROM utenti WHERE id = ?";
    connessione.query(sql, id, (err, data) => {
      connessione.end();
      if (!err) {
        res.json({
          message: "Utente eliminato correttamente",
          data: data,
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.put("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let nuovoInserimento = [
      req.body.nome,
      req.body.cognome,
      req.body.username,
      req.body.password,
      req.body.lastlogin,
      req.body.enabled,
      id,
    ];
    nuovoInserimento[3] = bcrypt.hashSync(nuovoInserimento[3], 10);
    const queryString =
      "UPDATE utenti SET nome = ?, cognome = ?, username = ?, password = ?, lastlogin = ?, enabled = ? WHERE id = ?";
    connessione.query(queryString, nuovoInserimento, (err, data) => {
      connessione.end();
      if (!err) {
        res.json({
          message: "Utente modificato correttamente",
          data: data,
        });
      } else {
        res.status(500).json({error: err});
      }
    });
  } else {
    res.status(404).json({error: "Parametro non valido"});
  }
});

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let queryString =
    "INSERT INTO utenti (nome, cognome, username, password, lastlogin, enabled) VALUES ?";
  let utenti = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(utenti)) {
    let nuoviUtenti = utenti.map((utente) => [
      utente.nome,
      utente.cognome,
      utente.username,
      utente.password,
      utente.lastlogin,
      utente.enabled,
    ]);
    connessione.query(queryString, [nuoviUtenti], (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          message: "Utenti inseriti correttamente",
          data: dati,
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM utenti WHERE username NOT LIKE 'admin'";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Tutti gli utenti sono stati eliminati correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

module.exports = service;
