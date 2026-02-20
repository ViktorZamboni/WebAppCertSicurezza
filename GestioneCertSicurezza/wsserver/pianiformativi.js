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
  let queryString =
    "SELECT id, nome, edizione, descrizione, livellorischio, datacreazione, durataprevista, percentualeobbligatorio FROM pianiformativi";
  connessione.query(queryString, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Lista piani formativi",
      });
    }
  });
});

service.get("/id/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString =
      "SELECT * FROM pianiformativi WHERE id = ?";
    connessione.query(queryString, id, (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piano formativo con id " + id,
        });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

// service.get("/edizione/:edizione", (req, res) => {
//   let edizione = req.params.edizione;
//   if (edizione) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT id, nome, edizione, descrizione, livellorischio, datacreazione, durataprevista, percentualeobbligatorio FROM pianiformativi WHERE edizione = ?";
//     connessione.query(queryString, edizione, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message: "Piano formativo con edizione " + edizione,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

service.post("/", (req, res) => {
  let nuovoPiano = [
    req.body.nome,
    req.body.edizione,
    req.body.descrizione,
    req.body.livellorischio,
    req.body.datacreazione,
    req.body.durataprevista,
    req.body.percentualeobbligatorio,
  ];

  console.log(nuovoPiano);

  const connessione = mysql.createConnection(parametriConnessioniDB);
  let queryString =
    "INSERT INTO pianiformativi (nome, edizione, descrizione, livellorischio, datacreazione, durataprevista, percentualeobbligatorio) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connessione.query(queryString, nuovoPiano, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Piano formativo inserito correttamente",
      });
    }
  });
});

service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM pianiformativi";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: dati,
          message: "Tutti i piani formativi sono stati eliminati correttamente",
        });
      }
    });
  }
});

service.delete("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM pianiformativi WHERE id = ?";
    connessione.query(queryString, id, (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piano formativo eliminato correttamente",
        });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.put("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    let nuovoPiano = [
      req.body.nome,
      req.body.edizione,
      req.body.descrizione,
      req.body.livellorischio,
      req.body.datacreazione,
      req.body.durataprevista,
      req.body.percentualeobbligatorio,
      id,
    ];
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString =
      "UPDATE pianiformativi SET nome = ?, edizione = ?, descrizione = ?, livellorischio = ?, datacreazione = ?, durataprevista = ?, percentualeobbligatorio = ? WHERE id = ?";
    connessione.query(queryString, nuovoPiano, (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piano formativo modificato correttamente",
        });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO pianiformativi (nome, edizione, descrizione, livellorischio, datacreazione, durataprevista, percentualeobbligatorio) VALUES ?";
  let pianiformativi = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(pianiformativi)) {
    let nuoviPiani = pianiformativi.map((piano) => [
      piano.nome,
      piano.edizione,
      piano.descrizione,
      piano.livellorischio,
      piano.datacreazione,
      piano.durataprevista,
      piano.percentualeobbligatorio,
    ]);
    connessione.query(querySTR, [nuoviPiani], (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piani formativi inseriti correttamente",
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
