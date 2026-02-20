const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const auth = require("./auth.js");
const refresh = require("./refresh.js");
const config = require("./config.js");
const bcrypt = require("bcrypt");
const fs = require("fs");

const abilitazioniRouter = require("./abilitazioni.js");
const anniscolasticiRouter = require("./anniscolastici.js");
const classiRouter = require("./classi.js");
const classistudentiRouter = require("./classistudenti.js");
const formatoriRouter = require("./formatori.js");
const formazionistudentiRouter = require("./formazionistudenti.js");
const logsRouter = require("./logs.js");
const moduliRouter = require("./moduli.js");
const pianiformativiRouter = require("./pianiformativi.js");
const pianiformativiModuliRouter = require("./pianiformativimoduli.js");
const pianiformativistudentiRouter = require("./pianiformativistudenti.js");
const studentiRouter = require("./studenti.js");
const utentiRouter = require("./utenti.js");
const refreshTokenRouter = require("./refresh.js");

const service = express();
service.use(bodyparser.json());
service.use(bodyparser.urlencoded({ extended: false }));

config.secret = fs.readFileSync("/run/secrets/init_secret", "utf8");
config.dbParams.password = fs.readFileSync(
  "/run/secrets/root_db_password",
  "utf8"
);
config.deleteSecret = fs.readFileSync("/run/secrets/delete_secret", "utf8");
config.dbParamsInit.password = config.dbParams.password;

const parametriConnessioniDB = config.dbParams;
const parametriConnessioneDBInit = config.dbParamsInit;

// ======================================================================================================================================================
service.get(config.baseUrl, (request, response) => {
  response.sendFile(__dirname + "/public/help.html");
});

service.get(config.baseUrl + "/style.css", (request, response) => {
  response.sendFile(__dirname + "/public/style.css");
});

service.get(config.baseUrl + "/help.html", (request, response) => {
  response.sendFile(__dirname + "/public/help.html");
});

service.get(config.baseUrl + "/scripts/init.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/init.js");
});

service.get(config.baseUrl + "/scripts/richieste.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/richieste.js");
});

service.get(config.baseUrl + "/scripts/style.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/style.js");
});

service.get(config.baseUrl + "/scripts/particles.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/particles.js");
});

service.get(config.baseUrl + "/scripts/cursor.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/cursor.js");
});

service.get(config.baseUrl + "/scripts/not_found.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/not_found.js");
});

service.get(config.baseUrl + "/scripts/intro.js", (request, response) => {
  response.sendFile(__dirname + "/public/scripts/intro.js");
});

service.get(config.baseUrl + "/assets/favicon.ico", (request, response) => {
  response.sendFile(__dirname + "/public/assets/favicon.ico");
});

service.get(config.baseUrl + "/assets/loader.svg", (request, response) => {
  response.sendFile(__dirname + "/public/assets/loader.svg");
});

service.get(
  config.baseUrl + "/assets/android-chrome-192x192.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/android-chrome-192x192.png");
  }
);

service.get(
  config.baseUrl + "/assets/android-chrome-512x512.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/android-chrome-512x512.png");
  }
);

service.get(
  config.baseUrl + "/assets/apple-touch-icon.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/apple-touch-icon.png");
  }
);

service.get(
  config.baseUrl + "/assets/favicon-16x16.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/favicon-16x16.png");
  }
);

service.get(
  config.baseUrl + "/assets/favicon-32x32.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/favicon-32x32.png");
  }
);

service.get(
  config.baseUrl + "/assets/site.webmanifest",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/site.webmanifest");
  }
);

service.get(
  config.baseUrl + "/assets/tabelle.png",
  (request, response) => {
    response.sendFile(__dirname + "/public/assets/tabelle.png");
  }
);

// INIT
service.post(config.baseUrl + "/init", (req, res) => {
  let secret = req.body.secret;
  if (secret == config.secret) {
    const scriptSQL = fs.readFileSync("GestioneCorsiSicurezza.sql", "utf8");
    let connessione = mysql.createConnection(parametriConnessioneDBInit);

    console.log("Inizializzazione database in corso...");

    connessione.query(scriptSQL, (err, data) => {
      connessione.end(() => {});
      if (!err) {
        connessione = mysql.createConnection(parametriConnessioniDB);
        let querystr =
          "INSERT INTO utenti (nome, cognome, username, password, enabled, ruolo) VALUES (?, ?, ?, ?, ?, ?)";
        let adminPsw = fs.readFileSync(
          "/run/secrets/admin_ws_password",
          "utf8"
        );
        let password = bcrypt.hashSync(adminPsw, config.saltRounds);
        let nuovoUtente = ["", "", "admin", password, true, 'admin'];
        connessione.query(querystr, nuovoUtente, (err, data) => {
          connessione.end(() => {});
          if (!err) {
            console.log("Database inizializzato correttamente!");
            res.json({ 
              message: "Database inizializzato correttamente, per modificare gli utenti modificare i file txt presenti nel webservice", 
              data: {
                "username": "admin",
                "password": password,
              }, 
            });
          } else {
            res.status(500).json({ error: err });
          }
        });
      } else {
        res.status(500).json({ error: err });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// LOGIN
service.post(config.baseUrl + "/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    connessione = mysql.createConnection(config.dbParams);
    let queryString = "SELECT * FROM utenti WHERE username = ?";
    connessione.query(queryString, username, (error, data) => {
      connessione.end(() => {});
      if (!error) {
        if (data.length > 0) {
          let utente = data[0];
          let passwordHash = utente.password;
          if (bcrypt.compareSync(password, passwordHash)) {
            let token = {};
            token.username = utente.username;

            // WORK IN PROGRESS: la data di scadenza non serve (credo), visto che viene gia impostata nella funzione "auth.generateAccessToken()"
            token.data_creazione = new Date();
            token.data_scadenza = new Date();
            token.data_scadenza.setDate(token.data_scadenza.getDate() + 1);

            token.ruolo = "admin";

            const accessToken = auth.generateAccessToken(token);
            const refreshToken = auth.generateRefreshToken(token);

            res.json({
              message: "Login effettuato correttamente",
              data: {
                "access-token": accessToken,
                "refresh-token": refreshToken,
              },
            });
          } else {
            res.status(401).json({ error: "Unauthorized" });
          }
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(500).json({ error: error });
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// ======================================================================================================================================================

service.use(config.urls.abilitazioni, abilitazioniRouter);
service.use(config.urls.anniscolastici, anniscolasticiRouter);
service.use(config.urls.classi, classiRouter);
service.use(config.urls.classistudenti, classistudentiRouter);
service.use(config.urls.formatori, formatoriRouter);
service.use(config.urls.formazionistudenti, formazionistudentiRouter);
service.use(config.urls.logs, logsRouter);
service.use(config.urls.moduli, moduliRouter);
service.use(config.urls.pianiformativi, pianiformativiRouter);
service.use(config.urls.pianiformativimoduli, pianiformativiModuliRouter);
service.use(config.urls.pianiformativistudenti, pianiformativistudentiRouter);
service.use(config.urls.studenti, studentiRouter);
service.use(config.urls.utenti, utentiRouter);
service.use(config.urls.token, refreshTokenRouter);

//Se si richiede una pagina inesistente si manda la pagina 404
service.use((req, res) => {
  res.sendFile(__dirname + "/public/not_found.html");
});

const server = service.listen(config.serverPort, () => {
  console.log("Server in ascolto sulla porta " + config.serverPort);
});
