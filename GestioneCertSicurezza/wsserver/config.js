const baseUrl = "/ws";

const config = {
  dbParams: {
    host: "gfs-sql-server",
    user: "root",
    password: "cisco",
    database: "gestionecorsisicurezza",
    multipleStatements: true,
  },
  dbParamsInit: {
    host: "gfs-sql-server",
    user: "root",
    password: "",
    multipleStatements: true,
  },
  serverPort: 3000,
  initSecret: "",
  saltRounds: 10,
  baseUrl: baseUrl,
  urls: {
    studenti: baseUrl + "/studenti",
    classi: baseUrl + "/classi",
    classistudenti: baseUrl + "/classistudenti",
    anniscolastici: baseUrl + "/anniscolastici",
    moduli: baseUrl + "/moduli",
    pianiformativi: baseUrl + "/pianiformativi",
    pianiformativimoduli: baseUrl + "/pianiformativimoduli",
    pianiformativistudenti: baseUrl + "/pianiformativistudenti",
    formatori: baseUrl + "/formatori",
    abilitazioni: baseUrl + "/abilitazioni",
    formazionistudenti: baseUrl + "/formazionistudenti",
    utenti: baseUrl + "/utenti",
    logs: baseUrl + "/logs",
    token: baseUrl + "/token",
  },
  secretPhrase: "Dai babilonesi in poi...",
  deleteSecret: "",
};

module.exports = config;
