const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const auth = require("./auth.js");

const config = require("./config.js");

const service = express.Router();
service.use(bodyparser.json());
service.use(bodyparser.urlencoded({ extended: false }));

const parametriConnessioniDB = config.dbParams;

service.use(auth.auth);

// ======================================================================================================================================================

service.get("/", (request, response) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR = "SELECT * FROM classistudenti";
  connessione.query(querySTR, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      response.json({
        message: "Lista classi studenti",
        data: dati,
      });
    } else {
      response.status(500).json({ error: error });
    }
  });
});

service.get("/id/:fkclasse/:fkstudente/:fkannoscolastico/:datainizio", (req, res) => {
  let fkclasse = req.params.fkclasse
  let fkstudente = req.params.fkstudente
  let fkannoscolastico = req.params.fkannoscolastico
  let datainizio = req.params.datainizio
  if (fkclasse && fkstudente && fkannoscolastico && datainizio) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM classistudenti WHERE fkclasse = ? and fkstudente = ? and fkannoscolastico = ? and datainizio = ?",
      fkclasse, fkstudente, fkannoscolastico, datainizio,
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
    "INSERT INTO classistudenti (fkannoscolastico, fkclasse, fkstudente, datainizio, datafine) VALUES (?, ?, ?, ?, ?)";
  let nuovaClasseStudente = [
    req.body.fkannoscolastico,
    req.body.fkclasse,
    req.body.fkstudente,
    req.body.datainizio,
    req.body.datafine,
  ];

  connessione.query(querySTR, nuovaClasseStudente, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: dati,
        message: "Classe studente inserita correttamente",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

service.put(
  "/annoscolastico-classe-studente/:annoscolastico/:classe/:studente",
  (req, res) => {
    let annoscolastico = req.params.annoscolastico;
    let classe = req.params.classe;
    let studente = req.params.studente;

    if (annoscolastico && classe && studente) {
      let fkannoscolastico = req.body.fkannoscolastico;
      let fkclasse = req.body.fkclasse;
      let fkstudente = req.body.fkstudente;
      let datainizio = req.body.datainizio;
      let datafine = req.body.datafine;
      const connessione = mysql.createConnection(parametriConnessioniDB);
      let querySTR =
        "UPDATE classistudenti SET fkannoscolastico = ?, fkclasse = ?, fkstudente = ?, datainizio = ?, datafine = ? WHERE fkannoscolastico = ? AND fkclasse = ? AND fkstudente = ?";
      let classeModificata = [
        fkannoscolastico,
        fkclasse,
        fkstudente,
        datainizio,
        datafine,
        annoscolastico,
        classe,
        studente,
      ];
      connessione.query(querySTR, classeModificata, (error, dati) => {
        connessione.end(() => {});
        if (!error) {
          res.json({
            data: dati,
            message: "Classe studente modificata correttamente",
          });
        } else {
          res.status(500).json({ error: error });
        }
      });
    } else {
      res.status(404).json({ error: "Parametro non valido" });
    }
  }
);

service.delete("/all", (req, res) => {
  let secret = req.body.secret;
  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM classistudenti";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutte le classi studenti sono state eliminate correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
});

service.delete(
  "/annoscolastico-classe-studente/:annoscolastico/:classe/:studente",
  (req, res) => {
    let annoscolastico = req.params.annoscolastico;
    let classe = req.params.classe;
    let studente = req.params.studente;
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "DELETE FROM classistudenti WHERE fkannoscolastico = ? AND fkclasse = ? AND fkstudente = ?";
    let classeDaEliminare = [annoscolastico, classe, studente];

    connessione.query(querySTR, classeDaEliminare, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Classe studente eliminata correttamente",
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  }
);

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO classistudenti (fkannoscolastico, fkclasse, fkstudente, datainizio, datafine) VALUES ?";
  let classiStudenti = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(classiStudenti)) {
    let nuovaClasseStudenti = classiStudenti.map((classe) => [
      classe.fkannoscolastico,
      classe.fkclasse,
      classe.fkstudente,
      classe.datafine,
      classe.datafine,
    ]);
    connessione.query(querySTR, [nuovaClasseStudenti], (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Classi studenti inserite correttamente",
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
