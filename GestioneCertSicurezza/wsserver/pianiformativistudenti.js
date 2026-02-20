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
  let queryString = "SELECT * FROM pianiformativistudenti";
  connessione.query(queryString, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Lista piani formativi studenti",
      });
    }
  });
});

service.get("/id/:fkpianoformativo/:fkstudente/:dataiscrizione", (req, res) => {
  let fkpianoformativo = req.params.fkpianoformativo
  let fkstudente = req.params.fkstudente
  let dataiscrizione = req.params.dataiscrizione 
  if (fkpianoformativo && fkstudente && dataiscrizione) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM pianiformativistudenti WHERE fkpianoformativo = ? and fkstudente = ? and dataiscrizione = ?",
      fkpianoformativo, fkstudente, dataiscrizione,
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

// service.get("/dataiscrizione/:dataiscrizione", (req, res) => {
//   let dataiscrizione = req.params.dataiscrizione;
//   if (dataiscrizione) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT dataiscrizione FROM pianiformativistudenti WHERE dataiscrizione = ?";
//     connessione.query(queryString, dataiscrizione, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message:
//             "Lista Piani formativi studente con dataiscrizione " +
//             dataiscrizione,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

// service.get("/datacertificazione/:datacertificazione", (req, res) => {
//   let datacertificazione = req.params.datacertificazione;
//   if (datacertificazione) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT datacertificazione FROM pianiformativistudenti WHERE datacertificazione = ?";
//     connessione.query(queryString, datacertificazione, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message:
//             "Lista Piani formativi studente con datacertificazione " +
//             datacertificazione,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

service.delete("/all", (req, res) => {
  let secret = req.body.secret;

  if (secret != config.deleteSecret) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM pianiformativistudenti";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: dati,
          message:
            "Tutti i piani formativi studenti sono stati eliminati correttamente",
        });
      }
    });
  }
});

service.delete(
  "/studente-pianoformativo-dataiscrizione/:studente/:pianoformativo/:dataiscrizione",
  (req, res) => {
    let studente = req.params.studente;
    let pianoformativo = req.params.pianoformativo;
    let dataiscrizione = req.params.dataiscrizione;

    if (studente && pianoformativo && dataiscrizione) {
      const connessione = mysql.createConnection(parametriConnessioniDB);
      let queryString =
        "DELETE FROM pianiformativistudenti WHERE fkstudente = ? AND fkpianoformativo = ? AND dataiscrizione = ?";
      connessione.query(
        queryString,
        studente,
        pianoformativo,
        dataiscrizione,
        (error, dati) => {
          connessione.end(() => {});
          if (error) {
            res.status(500).json({ error: error });
          } else {
            res.json({
              data: dati,
              message: "Piano formativo studente eliminato correttamente",
            });
          }
        }
      );
    } else {
      res.status(404).json({ error: "Parametro non valido" });
    }
  }
);

service.post("/", (req, res) => {
  let nuovoPFS = [
    req.body.fkstudente,
    req.body.fkpianoformativo,
    req.body.dataiscrizione,
    req.body.datacertificazione,
  ];

  const connessione = mysql.createConnection(parametriConnessioniDB);
  let queryString =
    "INSERT INTO pianiformativistudenti (fkstudente, fkpianoformativo, dataiscrizione, datacertificazione) VALUES (?, ?, ?, ?)";
  connessione.query(queryString, nuovoPFS, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Piano formativo studente inserito correttamente",
      });
    }
  });
});

service.put(
  "/studente-pianoformativo-dataiscrizione/:fkstudente/:fkpianoformativo/:dataiscrizione",
  (req, res) => {
    if (
      req.params.fkstudente &&
      req.params.fkpianoformativo &&
      req.params.dataiscrizione
    ) {
      let nuovoPiano = [
        req.body.fkstudente,
        req.body.fkpianoformativo,
        req.body.dataiscrizione,
        req.body.datacertificazione,
        req.params.fkstudente,
        req.params.fkpianoformativo,
        req.params.dataiscrizione,
      ];
      const connessione = mysql.createConnection(parametriConnessioniDB);
      let queryString =
        "UPDATE pianiformativistudenti SET fkstudente = ?, fkpianoformativo = ?, dataiscrizione = ?, datacertificazione = ? WHERE fkstudente = ? AND fkpianoformativo = ? AND dataiscrizione = ?";
      connessione.query(queryString, nuovoPiano, (error, data) => {
        connessione.end(() => {});
        if (error) {
          res.status(500).json({ error: error });
        } else {
          res.json({
            data: data,
            message: "Piano formativo studente modificato correttamente",
          });
        }
      });
    } else {
      res.status(404).json({ error: "Parametro non valido" });
    }
  }
);

service.post("/array", (req, res) => {
  const connessione = mysql.createConnection(parametriConnessioniDB);
  let querySTR =
    "INSERT INTO pianiformativistudenti (fkstudente, fkpianoformativo, dataiscrizione, datacertificazione) VALUES ?";
  let pianiFormativi = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(pianiFormativi)) {
    let nuoviPianiFormativi = pianiFormativi.map((pianoFormativo) => [
      pianoFormativo.fkstudente,
      pianoFormativo.fkpianoformativo,
      pianoFormativo.dataiscrizione,
      pianoFormativo.datacertificazione,
    ]);
    connessione.query(querySTR, [nuoviPianiFormativi], (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piani formativi studenti inseriti correttamente",
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
