const express = require("express");
const bodyparser = require("body-parser");
const config = require("./config.js");
const auth = require("./auth.js");
const jwt = require("jsonwebtoken");

const service = express.Router();
service.use(bodyparser.json());
service.use(bodyparser.urlencoded({ extended: false }));

// ======================================================================================================================================================

/**
 * Genera un nuovo token normale (non refresh-token), inviando il proprio token di refresh
 */
service.post("/", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).json({error: "Unauthorized"});
  }

  jwt.verify(refreshToken, config.secretPhrase, (err, user) => {
    if (err) {
      res.status(403).json({error: "Forbidden"});
    }

    // Genera un nuovo token di accesso
    /*const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });

    // Restituisci il nuovo token di accesso al client
    res.json({ token: accessToken });*/

    // Crea un token e aggiunge atributi
    const token = {};
    token.ruolo = "admin";

    const accessToken = auth.generateAccessToken(token);
    const refreshToken = auth.generateRefreshToken(token);

    res.json({
      message: "Refresh token effettuato correttamente",
      data: {
        "access-token": accessToken,
        "refresh-token": refreshToken,
      },
    });
  });
});

module.exports = service;
