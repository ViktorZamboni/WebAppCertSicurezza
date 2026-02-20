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
  let querySTR = "SELECT * FROM studenti";
  connessione.query(querySTR, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      response.json({
        message: "Lista studenti",
        data: dati,
      });
    } else {
      response.status(500).json({ error: error});
    }
  });
});

// richiesta per ottenere tutti gli studenti facenti parte di una determinata classe in un determinato anno scolastico

service.get("/:fkannoscolastico/:fkclasse", (req, res) => {
  let fkannoscolastico = req.params.fkannoscolastico;
  let fkclasse = req.params.fkclasse;
  if (fkannoscolastico && fkclasse) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "SELECT codicefiscale, nome, cognome, datanascita, sesso, fkclasse as 'classe', fkannoscolastico as 'anno scolastico' FROM studenti JOIN classistudenti ON classistudenti.fkstudente = studenti.codicefiscale WHERE fkannoscolastico = ? AND fkclasse = ? ";
    connessione.query(querySTR, fkannoscolastico, fkclasse, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Lista studenti",
          data: data,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  }
});



service.get("/id/:codicefiscale", (req, res) => {
  let codicefiscale = req.params.codicefiscale;
  if (codicefiscale) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM studenti WHERE UPPER(codicefiscale) = UPPER(?)",
      codicefiscale,
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

service.put("/id/:codicefiscale", (req, res) => {
  let codicefiscale = req.params.codicefiscale;
  if (codicefiscale) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR =
      "UPDATE studenti SET codicefiscale = ?, nome = ?, cognome = ?, datanascita = ?, sesso = ? WHERE codicefiscale = ?";
    let studenteModificato = [
      req.body.codicefiscale,
      req.body.nome,
      req.body.cognome,
      req.body.datanascita,
      req.body.sesso,
      codicefiscale
    ];
    connessione.query(querySTR, studenteModificato, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Studente modificato correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido"});
  }
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized"});
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM studenti";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Tutti gli studenti sono stati eliminati correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  }
});

service.delete("/id/:codicefiscale", (req, res) => {
  let codicefiscale = req.params.codicefiscale;
  if (codicefiscale) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let querySTR = "DELETE FROM studenti WHERE codicefiscale = ?";
    connessione.query(querySTR, codicefiscale, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          message: "Studente eliminato correttamente",
          data: dati,
        });
      } else {
        res.status(500).json({ error: error});
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido"});
  }
});

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO studenti (codicefiscale, nome, cognome, datanascita, sesso) VALUES ?";
  let studenti = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(studenti)) {
    let nuoviStudenti = studenti.map((studente) => [
      studente.codicefiscale,
      studente.nome,
      studente.cognome,
      studente.datanascita,
      studente.sesso,
    ]);
    connessione.query(querySTR, [nuoviStudenti], (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res
          .status(500)
          .json({ error: error });
      } else {
        res.json({
          message: "Studenti inseriti correttamente",
          data: dati,
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

service.post("/", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO studenti (codicefiscale, nome, cognome, datanascita, sesso) VALUES (?, ?, ?, ?, ?)";
  let nuovaClasse = [
    req.body.codicefiscale,
    req.body.nome,
    req.body.cognome,
    req.body.datanascita,
    req.body.sesso,
  ];
  connessione.query(querySTR, nuovaClasse, (error, dati) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        message: "Studente inserito correttamente",
        data: dati,
      });
    } else {
      res.status(500).json({ error: error});
    }
  });
});

module.exports = service;
