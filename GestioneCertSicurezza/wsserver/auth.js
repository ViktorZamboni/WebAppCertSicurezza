const jwt = require("jsonwebtoken");
const config = require("./config.js");

const tempoScadenzaToken = "15m";

// ======================================================================================================================================================

// Funzione per generare un token JWT
function generateAccessToken(user) {
  return jwt.sign(user, config.secretPhrase, { expiresIn: tempoScadenzaToken });
}

// Funzione per generare un refresh token JWT
function generateRefreshToken(user) {
  return jwt.sign(user, config.secretPhrase);
}

// Middleware per verificare il token durante le richieste protette
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.secretPhrase, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Funzione da usare come middleware per verificare se il token è valido durante ogni richiesta
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized"});
  }

  jwt.verify(token, config.secretPhrase, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Forbidden: token"});
    }

    req.ruolo = token.ruolo;
    next();
  });
}

// IN CASO FUTURO DI MODIFICHE ALLA SICUREZZA => PATH PROTECTED
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'Rotta protetta. Solo utenti autenticati possono accedere.' });
// });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  auth,
};
