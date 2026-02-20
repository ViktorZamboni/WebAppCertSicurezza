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
  connessione.query("SELECT * FROM formazionistudenti", (error, data) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: data,
        message: "Lista formazioni studenti",
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
      "SELECT * FROM formazionistudenti WHERE id = ?",
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

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let nuovoInserimento = [
    req.body.fkformatore,
    req.body.fkstudente,
    req.body.fkmodulo,
    req.body.dataformazione,
    req.body.minutipresenza,
    req.body.superata,
    req.body.dataesame,
  ];
  const sql =
    "INSERT INTO formazionistudenti(fkformatore, fkstudente, fkmodulo, dataformazione, minutipresenza, superata, dataesame) VALUES (?, ?, ?, ?, ?, ?, ?)";
  connessione.query(sql, nuovoInserimento, (error, data) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: data,
        message: "Formazione studente inserita correttamente",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;
  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM formazionistudenti";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutte le formazioni studenti sono state eliminate correttamente",
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
    const sql = "DELETE FROM formazionistudenti WHERE id = ?";
    connessione.query(sql, id, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Formazione studente eliminata correttamente",
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
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let nuovoInserimento = [
      req.body.fkformatore,
      req.body.fkstudente,
      req.body.fkmodulo,
      req.body.dataformazione,
      req.body.minutipresenza,
      req.body.superata,
      req.body.dataesame,
      id,
    ];
    const queryString =
      "UPDATE formazionistudenti SET fkformatore = ?, fkstudente = ?, fkmodulo = ?, dataformazione = ?, minutipresenza = ?, superata = ?, dataesame = ? WHERE id = ?";
    connessione.query(queryString, nuovoInserimento, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Formazione studente modificata correttamente",
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
  let queryString =
    "INSERT INTO formazionistudenti (fkformatore, fkstudente, fkmodulo, dataformazione, minutipresenza, superata, dataesame) VALUES ?";
  let formazioniStudenti = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(formazioniStudenti)) {
    let nuoveFormazioniStudenti = formazioniStudenti.map((formazione) => [
      formazione.fkformatore,
      formazione.fkstudente,
      formazione.fkmodulo,
      formazione.dataformazione,
      formazione.minutipresenza,
      formazione.superata,
      formazione.dataesame,
    ]);
    connessione.query(queryString, [nuoveFormazioniStudenti], (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Formazioni studenti inserite correttamente",
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
