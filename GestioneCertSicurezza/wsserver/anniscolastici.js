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
  let querySTR = "SELECT * FROM anniscolastici";
  connessione.query(querySTR, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      response.json({
        data: dati,
        message: "Lista anni scolastici",
      });
    } else {
      response.status(500).json({ error: error });
    }
  });
});

service.get("/id/:annoscolastico", (req, res) => {
  let annoscolastico = req.params.annoscolastico;
  if (annoscolastico) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM anniscolastici WHERE annoscolastico = ?",
      annoscolastico,
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
    "INSERT INTO anniscolastici (annoscolastico, annoinizio, annofine) VALUES (?, ?, ?)";
  let nuovoAnno = [
    req.body.annoscolastico,
    req.body.annoinizio,
    req.body.annofine,
  ];

  connessione.query(querySTR, nuovoAnno, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: dati,
        message: "Anno scolastico inserito correttamente",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

//metodo PUT per modificare una annoscolastico
service.put("/annoscolastico/:annoscolastico", (req, res) => {
  let annoscolastico = req.params.annoscolastico;
  if (annoscolastico) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "UPDATE anniscolastici SET annoscolastico = ?, annoinizio = ?, annofine = ? WHERE annoscolastico = ?";
    let annoModificato = [
      req.body.annoscolastico,
      req.body.annoinizio,
      req.body.annofine,
      annoscolastico,
    ];
    connessione.query(querySTR, annoModificato, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Anno scolastico modificato correttamente",
        });
      } else {
        res.status(500).json({ error: error });
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
    let queryString = "DELETE FROM anniscolastici";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutti gli anni scolastici sono stati eliminati correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

service.delete("/annoscolastico/:annoscolastico", (req, res) => {
  let annoscolastico = req.params.annoscolastico;
  if (annoscolastico) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR = "DELETE FROM anniscolastici WHERE annoscolastico = ?";
    let annoDaEliminare = [annoscolastico];
    connessione.query(querySTR, annoDaEliminare, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Anno scolastico eliminato correttamente",
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
  let querySTR =
    "INSERT INTO anniscolastici (annoscolastico, annoinizio, annofine) VALUES ?";
  let anniscolastici = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(anniscolastici)) {
    let nuoviAnniScolastici = anniscolastici.map((annoscolastico) => [
      annoscolastico.annoscolastico,
      annoscolastico.annoinizio,
      annoscolastico.annofine,
    ]);
    connessione.query(querySTR, [nuoviAnniScolastici], (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: dati,
          message: "Anni scolastici inseriti correttamente",
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
