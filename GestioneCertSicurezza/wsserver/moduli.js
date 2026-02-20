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
    "SELECT id, nome, edizione, argomenti, datacreazione, modificabile, datamodifica FROM moduli";
  connessione.query(queryString, (error, data) => {
    connessione.end(() => {});
    if (!error) {
      res.json({
        data: data,
        message: "Lista moduli",
      });
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// richiesta per ottenere tutti le informazioni sui moduli svolti da un dato studente

service.get("/:codicefiscale", (req, res) => {
  let codicefiscale = req.params.codicefiscale;
  if (codicefiscale) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "SELECT codicefiscale, dataformazione, minutipresenza, superata, dataesame, moduli.id, moduli.nome, edizione, argomenti, datacreazione, modificabile, datamodifica FROM studenti JOIN formazionistudenti ON formazionistudenti.fkstudente = studenti.codicefiscale JOIN moduli ON moduli.id = formazionistudenti.fkmodulo WHERE codicefiscale = ?";
    connessione.query(queryString, codicefiscale, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Moduli svolti da " + codicefiscale,
        });
      } else {
        res.status(500).json({ error: error });
      }
    });
  } else {
    res.status(404).json({ error: "Parametro non valido" });
  }
});


service.get("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM moduli WHERE id = ?",
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

// service.get("/edizione/:edizione", (req, res) => {
//   let edizione = req.params.edizione;
//   if (edizione) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT id, nome, edizione, argomenti, datacreazione, modificabile, datamodifica FROM moduli WHERE edizione = ?";
//     connessione.query(queryString, edizione, (error, data) => {
//       connessione.end(() => {});
//       if (!error) {
//         res.json({
//           data: data,
//           message: "Moduli con edizione " + edizione,
//         });
//       } else {
//         res.status(500).json({ error: error });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

service.post("/", (req, res) => {
  let nuovoUtente = [
    req.body.nome,
    req.body.edizione,
    req.body.argomenti,
    req.body.datacreazione,
    req.body.modificabile,
    req.body.datamodifica,
  ];

  const connessione = mysql.createConnection(parametriConnessioniDB);
  let queryString =
    "INSERT INTO moduli (nome, edizione, argomenti, datacreazione, modificabile, datamodifica) VALUES (?, ?, ?, ?, ?, ?)";
  connessione.query(queryString, nuovoUtente, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Modulo inserito correttamente",
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
    let queryString = "DELETE FROM moduli";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Tutti i moduli sono stati eliminati correttamente",
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
    let queryString = "DELETE FROM moduli WHERE id = ?";
    connessione.query(queryString, id, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Modulo eliminato correttamente",
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
    let nuovoModulo = [
      req.body.nome,
      req.body.edizione,
      req.body.argomenti,
      req.body.datacreazione,
      req.body.modificabile,
      req.body.datamodifica,
      id,
    ];
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString =
      "UPDATE moduli SET nome = ?, edizione = ?, argomenti = ?, datacreazione = ?, modificabile = ?, datamodifica = ? WHERE id = ?";
    connessione.query(queryString, nuovoModulo, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: data,
          message: "Modulo modificato correttamente",
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
    "INSERT INTO moduli (nome, edizione, argomenti, datacreazione, modificabile, datamodifica) VALUES ?";
  let moduli = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(moduli)) {
    let nuoviModuli = moduli.map((modulo) => [
      modulo.nome,
      modulo.edizione,
      modulo.argomenti,
      modulo.datacreazione,
      modulo.modificabile,
      modulo.datamodifica,
    ]);
    connessione.query(querySTR, [nuoviModuli], (error, dati) => {
      connessione.end(() => {});
      if (!error) {
        res.json({
          data: dati,
          message: "Moduli inseriti correttamente",
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
