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
    "SELECT * FROM pianiformativimoduli";
  connessione.query(queryString, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Lista piani formativi moduli",
      });
    }
  });
});

service.get("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    connessione.query(
      "SELECT * FROM pianiformativimoduli WHERE id = ?",
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

// service.get("/obbligatorio/:obbligatorio", (req, res) => {
//   let obbligatorio = req.params.obbligatorio;
//   if (obbligatorio) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT id, fkpianoformativo, fkmodulo, durata, obbligatorio FROM pianiformativimoduli WHERE obbligatorio = ?";
//     connessione.query(queryString, obbligatorio, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message: "Lista piani formativi moduli obbligatori",
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

// service.get("/modulo/:modulo", (req, res) => {
//   let modulo = req.params.modulo;
//   if (modulo) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT id, fkpianoformativo, fkmodulo, durata, obbligatorio FROM pianiformativimoduli WHERE fkmodulo = ?";
//     connessione.query(queryString, modulo, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message: "Lista piani formativi moduli con modulo " + modulo,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

// service.get("/piano-formativo/:pianoformativo", (req, res) => {
//   let pianoFormativo = req.params.pianoformativo;
//   if (pianoFormativo) {
//     const connessione = mysql.createConnection(parametriConnessioniDB);
//     let queryString =
//       "SELECT id, fkpianoformativo, fkmodulo, durata, obbligatorio FROM pianiformativimoduli WHERE fkpianoformativo = ?";
//     connessione.query(queryString, pianoFormativo, (error, data) => {
//       connessione.end(() => {});
//       if (error) {
//         res.status(500).json({ error: error });
//       } else {
//         res.json({
//           data: data,
//           message: "Lista piani formativi moduli con piano formativo " + pianoFormativo,
//         });
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Parametro non valido" });
//   }
// });

service.post("/", (req, res) => {
  let nuovoPianoFormativoModulo = [
    req.body.fkpianoformativo,
    req.body.fkmodulo,
    req.body.durata,
    req.body.obbligatorio,
  ];

  const connessione = mysql.createConnection(parametriConnessioniDB);
  let queryString =
    "INSERT INTO pianiformativimoduli (fkpianoformativo, fkmodulo, durata, obbligatorio) VALUES (?, ?, ?, ?)";

  connessione.query(queryString, nuovoPianoFormativoModulo, (error, data) => {
    connessione.end(() => {});
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({
        data: data,
        message: "Piano formativo modulo inserito correttamente",
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
    let queryString = "DELETE FROM pianiformativimoduli";
    connessione.query(queryString, (error, dati) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: dati,
          message: "Tutti i piani formativi moduli sono stati eliminati correttamente",
        });
      }
    });
  }
});

service.delete("/id/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString = "DELETE FROM pianiformativimoduli WHERE id = ?";
    connessione.query(queryString, id, (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piano formativo modulo eliminato correttamente",
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
    let nuovoPianoFormativoModulo = [
      req.body.fkpianoformativo,
      req.body.fkmodulo,
      req.body.durata,
      req.body.obbligatorio,
      id,
    ];
    const connessione = mysql.createConnection(parametriConnessioniDB);
    let queryString =
      "UPDATE pianiformativimoduli SET fkpianoformativo = ?, fkmodulo = ?, durata = ?, obbligatorio = ? WHERE id = ?";
    connessione.query(queryString, nuovoPianoFormativoModulo, (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piano formativo modulo modificato correttamente",
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
    "INSERT INTO pianiformativimoduli (fkpianoformativo, fkmodulo, durata, obbligatorio) VALUES ?";
  let pianiformativimoduli = req.body;
  // Controllo se quello che mi arriva è un array
  if (Array.isArray(pianiformativimoduli)) {
    let nuoviPianiFormativiModuli = pianiformativimoduli.map(
      (pianiformativomodulo) => [
        pianiformativomodulo.fkpianoformativo,
        pianiformativomodulo.fkmodulo,
        pianiformativomodulo.durata,
        pianiformativomodulo.obbligatorio,
      ]
    );
    connessione.query(querySTR, [nuoviPianiFormativiModuli], (error, data) => {
      connessione.end(() => {});
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.json({
          data: data,
          message: "Piani formativi moduli inseriti correttamente",
        });
      }
    });
  } else {
    res.status(400).json({ error: "Body della richiesta non valido" });
  }
});

module.exports = service;
