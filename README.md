# WebAppCertSicurezza
Applicazione web per la gestione dei certificati di sicurezza dell'Istituto Tecnico Tecnologico "G. Marconi" di Rovereto.

## Descrizione
Il sistema consente agli amministratori e al personale autorizzato di gestire il ciclo di vita dei certificati di sicurezza (emissione, rinnovo, revoca) relativi a studenti, docenti e dispositivi di laboratorio. L'applicazione fornisce un'interfaccia web per visualizzare, cercare, aggiungere e modificare i certificati, con supporto per l'upload di file (es. chiavi pubbliche, richieste di firma) e la generazione di report.

## Funzionalità principali
Autenticazione e autorizzazione degli utenti (admin, operatori) tramite login.

## Gestione anagrafica di studenti, docenti e dispositivi.

Registro certificati: elenco completo con dettagli (intestatario, tipo, data emissione/scadenza, stato).

Operazioni CRUD: creazione, lettura, modifica e cancellazione dei certificati.

Caricamento file associati (es. .crt, .pem, .csr).

Notifiche automatiche via email per certificati in scadenza.

Ricerca e filtri avanzati per intestatario, tipo, data, stato.

Esportazione dati in formato CSV/PDF per reportistica.

## Tecnologie utilizzate
Frontend: HTML5, CSS3, JavaScript (Vanilla JS per interattività, AJAX per chiamate asincrone).

Backend: Node.js con Express.js (API REST).

Database: SQLite (file locale) per semplicità di deployment.

Container: Docker con Dockerfile per ambienti isolati.

Dipendenze: pacchetti npm (express, body-parser, sqlite3, nodemailer, multer, etc.).

## Prerequisiti
Node.js (versione 16 o superiore) e npm installati.

Docker (opzionale, per esecuzione containerizzata).

Porta 8080 libera (configurabile).

## Installazione ed esecuzione
Modalità tradizionale (senza Docker)
Clonare il repository:

bash
git clone https://github.com/ViktorZamboni/WebAppCertSicurezza.git
cd WebAppCertSicurezza
Installare le dipendenze:

bash
npm install
Avviare il server:

bash
node server.js
Oppure con nodemon per sviluppo:

bash
npm run dev
Aprire il browser all'indirizzo http://localhost:8080.

Modalità containerizzata (Docker)
Costruire l'immagine:

bash
docker build -t webappcertsicurezza .
Eseguire il container:

bash
docker run -p 8080:8080 webappcertsicurezza
Accedere a http://localhost:8080.

## Utilizzo
Accesso: utilizzare le credenziali fornite dall'amministratore (default: admin/admin da modificare al primo accesso).

Navigazione: menu laterale con sezioni: Dashboard, Anagrafica, Certificati, Report, Impostazioni.

Aggiunta certificato: cliccare su "Nuovo certificato", compilare il form e caricare eventuali file.

Ricerca: utilizzare la barra di ricerca globale o i filtri avanzati.

Notifiche: le email vengono inviate automaticamente ogni giorno alle 8:00 per i certificati in scadenza nei successivi 30 giorni.

Configurazione
Server: modificare la porta nel file server.js (variabile PORT).

Email: impostare i parametri SMTP nel file config/email.json.

Database: il file SQLite certificati.db viene creato automaticamente all'avvio. Per reset, eliminare il file e riavviare.

## Struttura del progetto
WebAppCertSicurezza/
├── public/               # File statici (HTML, CSS, JS client)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── routes/               # Route Express
├── controllers/          # Logica di business
├── models/               # Modelli dati e interazioni DB
├── views/                # Template (se utilizzati)
├── uploads/              # File caricati (certificati)
├── config/               # File di configurazione
├── server.js             # Entry point
├── package.json
├── Dockerfile
└── README.md

Licenza
Nessuna licenza specificata. Tutti i diritti riservati all'Istituto Marconi di Rovereto.
