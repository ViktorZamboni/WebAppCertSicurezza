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
  connessione.query("SELECT * FROM abilitazioni", (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        message: "Lista abilitazioni",
        data: data,
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
});

service.get("/id/:fkmodulo/:fkformatore", (req, res) => {
  let fkformatore = req.params.fkformatore;
  let fkmodulo = req.params.fkmodulo;
  if (fkmodulo && fkformatore) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM abilitazioni WHERE fkmodulo = ? and fkformatore = ?", fkmodulo, fkformatore,
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
    res.send("Parametri inesistente");
  }
});

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let nuovoInserimento = [req.body.fkmodulo, req.body.fkformatore];
  const sql = "INSERT INTO abilitazioni(fkmodulo, fkformatore) VALUES (?, ?)";
  connessione.query(sql, nuovoInserimento, (err, data) => {
    connessione.end(() => {});
    if (!err) {
      res.json({
        message: "Abilitazione inserita correttamente",
        data: data,
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;
  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM abilitazioni";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Tutte le abilitazioni sono state eliminate correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

service.delete("/formatore-modulo/:fkformatore/:fkmodulo", (req, res) => {
  let fkformatore = req.params.fkformatore;
  let fkmodulo = req.params.fkmodulo;

  if (fkformatore && fkmodulo) {
    let nuovoInserimento = [fkformatore, fkmodulo];
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql =
      "DELETE FROM abilitazioni WHERE fkformatore = ? && fkmodulo = ?";
    connessione.query(sql, nuovoInserimento, (err, data) => {
      connessione.end(() => {});
      if (!err) {
        res.json({
          message: "Abilitazione eliminata correttamente",
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

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR = "INSERT INTO abilitazioni (fkmodulo, fkformatore) VALUES ?";
  let abilitazioni = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(abilitazioni)) {
    let nuoveAbilitazioni = abilitazioni.map((abilitazione) => [
      abilitazione.fkmodulo,
      abilitazione.fkformatore,
    ]);
    connessione.query(querySTR, [nuoveAbilitazioni], (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          message: "Abilitazioni inserite correttamente",
          data: dati,
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

service.put("/formatore-modulo/:fkformatore/:fkmodulo", (req, res) => {
  let fkformatore = req.params.fkformatore;
  let fkmodulo = req.params.fkmodulo;
  if (fkformatore && fkmodulo) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    const sql =
      "UPDATE abilitazioni SET fkformatore = ?, fkmodulo = ? WHERE fkformatore = ? && fkmodulo = ?";
    let nuovoInserimento = [
      req.body.fkformatore,
      req.body.fkmodulo,
      req.params.fkformatore,
      req.params.fkmodulo,
    ];
    connessione.query(sql, nuovoInserimento, (err, data) => {
      connessione.end(() => {});
      if (!err) {
        res.json({
          message: "Abilitazione modificata correttamente",
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

module.exports = service;
