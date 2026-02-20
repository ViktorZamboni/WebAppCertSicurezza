const richieste = {
  app: [
    {
      url: "/init",
      descrizione: "Inizializza il database",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "root",
        }
      ],
    },
    {
      url: "/login",
      descrizione: "Login",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "username",
          descrizione: "Username",
          tipo: "string",
          example: "admin",
        },
        {
          nome: "password",
          descrizione: "Password",
          tipo: "string",
          example: "root",
        },
      ],
    },
    {
      url: "/token",
      descrizione: "Refresh token",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "refreshToken",
          descrizione: "Refresh token",
          tipo: "string",
          example: "refreshToken",
        },
      ],
    },
  ],
  moduli: [
    {
      url: "/moduli",
      descrizione: "Restituisce tutti i moduli",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/moduli/id/:id",
      descrizione: "Restituisce il modulo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/moduli/edizione/:edizione",
      descrizione: "Restituisce il modulo con l'edizione specificata",
      parametri: [
        {
          nome: "edizione",
          descrizione: "Edizione del modulo",
          tipo: "number",
          example: "2023-2024",
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/moduli",
      descrizione: "Crea un nuovo modulo",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del modulo",
          tipo: "string",
          example: "Modulo 1",
        },
        {
          nome: "edizione",
          descrizione: "Edizione del modulo",
          tipo: "string",
          example: "2023-2024",
        },
        {
          nome: "argomenti",
          descrizione: "Argomenti del modulo",
          tipo: "string",
          example: "Argomento 1, Argomento 2, Argomento 3",
        },
        {
          nome: "datacreazione",
          descrizione: "Data creazione del modulo",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "modificabile",
          descrizione: "Modificabile del modulo",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "datamodifica",
          descrizione: "Data modifica del modulo",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/moduli/id/:id",
      descrizione: "Modifica il modulo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del modulo",
          tipo: "string",
          example: "Modulo 1",
        },
        {
          nome: "edizione",
          descrizione: "Edizione del modulo",
          tipo: "string",
          example: "2023-2024",
        },
        {
          nome: "argomenti",
          descrizione: "Argomenti del modulo",
          tipo: "string",
          example: "Argomento 1, Argomento 2, Argomento 3",
        },
        {
          nome: "datacreazione",
          descrizione: "Data creazione del modulo",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "modificabile",
          descrizione: "Modificabile del modulo",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "datamodifica",
          descrizione: "Data modifica del modulo",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/moduli/id/:id",
      descrizione: "Elimina il modulo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/moduli/all",
      descrizione: "Elimina tutti i moduli",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/moduli/array",
      descrizione: "Crea un modulo per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "moduli",
          descrizione: "Array di moduli",
          tipo: "array",
          example: [
            {
              nome: "Modulo 1",
              edizione: "2023-2024",
              argomenti: "Argomento 1, Argomento 2, Argomento 3",
              datacreazione: "2023-01-28",
              modificabile: true,
              datamodifica: "2023-01-28",
            },
            {
              nome: "Modulo 2",
              edizione: "2023-2024",
              argomenti: "Argomento 1, Argomento 2, Argomento 3",
              datacreazione: "2023-01-28",
              modificabile: true,
              datamodifica: "2023-01-28",
            },
          ],
        },
      ],
    },
  ],
  abilitazioni: [
    {
      url: "/abilitazioni",
      descrizione: "Restituisce tutte le abilitazioni",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/abilitazioni",
      descrizione: "Crea una nuova abilitazione",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
    },
    {
      url: "/abilitazioni/all",
      descrizione: "Elimina tutte le abilitazioni",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/abilitazioni/formatore-modulo/:fkformatore/:fkmodulo",
      descrizione:
        "Elimina l'abilitazione con il formatore e il modulo specificati",
      parametri: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/abilitazioni/array",
      descrizione: "Crea un'abilitazione per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "abilitazioni",
          descrizione: "Array di abilitazioni",
          tipo: "array",
          example: [
            {
              fkformatore: 1,
              fkmodulo: 1,
            },
            {
              fkformatore: 1,
              fkmodulo: 2,
            },
          ],
        },
      ],
    },
    {
      url: "/abilitazioni/formatore-modulo/:fkformatore/:fkmodulo",
      descrizione:
        "Modifica l'abilitazione con il formatore e il modulo specificati",
      parametri: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
    },
  ],
  anniscolastici: [
    {
      url: "/anniscolastici",
      descrizione: "Restituisce tutti gli anni scolastici",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/anniscolastici",
      descrizione: "Crea un nuovo anno scolastico",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "annoscolastico",
          descrizione: "Anno scolastico",
          tipo: "string",
          example: "2023-24",
        },
        {
          nome: "annoinizio",
          descrizione: "Anno inizio",
          tipo: "number",
          example: 2023,
        },
        {
          nome: "annofine",
          descrizione: "Anno fine",
          tipo: "number",
          example: 2024,
        },
      ],
    },
    {
      url: "/anniscolastici/annoscolastico/:annoscolastico",
      descrizione:
        "Modifica l'anno scolastico con l'anno scolastico specificato",
      parametri: [
        {
          nome: "annoscolastico",
          descrizione: "Anno scolastico",
          tipo: "string",
          example: "2023-24",
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "annoscolastico",
          descrizione: "Anno scolastico",
          tipo: "string",
          example: "2023-24",
        },
        {
          nome: "annoinizio",
          descrizione: "Anno inizio",
          tipo: "number",
          example: 2023,
        },
        {
          nome: "annofine",
          descrizione: "Anno fine",
          tipo: "number",
          example: 2024,
        },
      ],
    },
    {
      url: "/anniscolastici/all",
      descrizione: "Elimina tutti gli anni scolastici",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/anniscolastici/annoscolastico/:annoscolastico",
      descrizione:
        "Elimina l'anno scolastico con l'anno scolastico specificato",
      parametri: [
        {
          nome: "annoscolastico",
          descrizione: "Anno scolastico",
          tipo: "string",
          example: "2023-24",
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/anniscolastici/array",
      descrizione: "Crea un anno scolastico per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "anniscolastici",
          descrizione: "Array di anni scolastici",
          tipo: "array",
          example: [
            {
              annoscolastico: "2023-24",
              annoinizio: 2023,
              annofine: 2024,
            },
            {
              annoscolastico: "2024-25",
              annoinizio: 2024,
              annofine: 2025,
            },
          ],
        },
      ],
    },
  ],
  classi: [
    {
      url: "/classi",
      descrizione: "Restituisce tutte le classi",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/classi",
      descrizione: "Crea una nuova classe",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome della classe",
          tipo: "string",
          example: "4A",
        },
        {
          nome: "anno",
          descrizione: "Anno della classe",
          tipo: "number",
          example: 4,
        },
        {
          nome: "sezione",
          descrizione: "Sezione della classe",
          tipo: "string",
          example: "A",
        },
        {
          nome: "indirizzo",
          descrizione: "Indirizzo della classe",
          tipo: "string",
          example: "Informatica",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione della classe",
          tipo: "string",
          example: "Classe di informatica",
        },
      ],
    },
    {
      url: "/classi/nome/:nome",
      descrizione: "Modifica la classe con il nome specificato",
      parametri: [
        {
          nome: "nome",
          descrizione: "Nome della classe",
          tipo: "string",
          example: "4A",
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome della classe",
          tipo: "string",
          example: "4A",
        },
        {
          nome: "anno",
          descrizione: "Anno della classe",
          tipo: "number",
          example: 4,
        },
        {
          nome: "sezione",
          descrizione: "Sezione della classe",
          tipo: "string",
          example: "A",
        },
        {
          nome: "indirizzo",
          descrizione: "Indirizzo della classe",
          tipo: "string",
          example: "Informatica",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione della classe",
          tipo: "string",
          example: "Classe di informatica",
        },
      ],
    },
    {
      url: "/classi/all",
      descrizione: "Elimina tutte le classi",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/classi/nome/:nome",
      descrizione: "Elimina la classe con il nome specificato",
      parametri: [
        {
          nome: "nome",
          descrizione: "Nome della classe",
          tipo: "string",
          example: "4A",
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/classi/array",
      descrizione: "Crea una classe per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "classi",
          descrizione: "Array di classi",
          tipo: "array",
          example: [
            {
              nome: "4A",
              anno: 4,
              sezione: "A",
              indirizzo: "Informatica",
              descrizione: "Classe di informatica",
            },
            {
              nome: "4B",
              anno: 4,
              sezione: "B",
              indirizzo: "Informatica",
              descrizione: "Classe di informatica",
            },
          ],
        },
      ],
    },
  ],
  classistudenti: [
    {
      url: "/classistudenti",
      descrizione: "Restituisce tutte le classi studenti",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/classistudenti",
      descrizione: "Crea una nuova classe studente",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "fkannoscolastico",
          descrizione: "Id dell'anno scolastico",
          tipo: "number",
          example: "2023-24",
        },
        {
          nome: "fkclasse",
          descrizione: "Id della classe",
          tipo: "string",
          example: "4A",
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "datainizio",
          descrizione: "Data inizio",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "datafine",
          descrizione: "Data fine",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/classistudenti/annoscolastico-classe-studente/:fkannoscolastico/:fkclasse/:fkstudente",
      descrizione:
        "Modifica la classe studente con l'anno scolastico, la classe e lo studente specificati",
      parametri: [
        {
          nome: "fkannoscolastico",
          descrizione: "Id dell'anno scolastico",
          tipo: "number",
          example: "2023-24",
        },
        {
          nome: "fkclasse",
          descrizione: "Id della classe",
          tipo: "number",
          example: "4A",
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "fkannoscolastico",
          descrizione: "Id dell'anno scolastico",
          tipo: "number",
          example: "2023-24",
        },
        {
          nome: "fkclasse",
          descrizione: "Id della classe",
          tipo: "number",
          example: "4A",
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "datainizio",
          descrizione: "Data inizio",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "datafine",
          descrizione: "Data fine",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/classistudenti/all",
      descrizione: "Elimina tutte le classi studenti",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/classistudenti/annoscolastico-classe-studente/:fkannoscolastico/:fkclasse/:fkstudente",
      descrizione:
        "Elimina la classe studente con l'anno scolastico, la classe e lo studente specificati",
      parametri: [
        {
          nome: "fkannoscolastico",
          descrizione: "Id dell'anno scolastico",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkclasse",
          descrizione: "Id della classe",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/classistudenti/array",
      descrizione: "Crea una classe studente per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "classistudenti",
          descrizione: "Array di classi studenti",
          tipo: "array",
          example: [
            {
              fkannoscolastico: 1,
              fkclasse: 1,
              fkstudente: 1,
              datainizio: "2023-01-28",
              datafine: "2023-01-28",
            },
            {
              fkannoscolastico: 1,
              fkclasse: 1,
              fkstudente: 2,
              datainizio: "2023-01-28",
              datafine: "2023-01-28",
            },
          ],
        },
      ],
    },
  ],
  formatori: [
    {
      url: "/formatori",
      descrizione: "Restituisce tutti i formatori",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/formatori",
      descrizione: "Crea un nuovo formatore",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del formatore",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome del formatore",
          tipo: "string",
          example: "Rossi",
        },
      ],
    },
    {
      url: "/formatori/id/:id",
      descrizione: "Modifica il formatore con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del formatore",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome del formatore",
          tipo: "string",
          example: "Rossi",
        },
      ],
    },
    {
      url: "/formatori/all",
      descrizione: "Elimina tutti i formatori",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/formatori/id/:id",
      descrizione: "Elimina il formatore con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/formatori/array",
      descrizione: "Crea un formatore per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "formatori",
          descrizione: "Array di formatori",
          tipo: "array",
          example: [
            {
              nome: "Mario",
              cognome: "Rossi",
            },
            {
              nome: "Luigi",
              cognome: "Verdi",
            },
          ],
        },
      ],
    },
  ],
  formazionistudenti: [
    {
      url: "/formazionistudenti",
      descrizione: "Restituisce tutte le formazioni studenti",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/formazionistudenti",
      descrizione: "Crea una nuova formazione studente",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "dataformazione",
          descrizione: "Data formazione",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "minutipresenza",
          descrizione: "Minuti presenza",
          tipo: "number",
          example: 300,
        },
        {
          nome: "superata",
          descrizione: "Superata",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "dataesame",
          descrizione: "Data esame",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/formazionistudenti/id/:id",
      descrizione: "Modifica la formazione studente con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id della formazione studente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "fkformatore",
          descrizione: "Id del formatore",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "dataformazione",
          descrizione: "Data formazione",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "minutipresenza",
          descrizione: "Minuti presenza",
          tipo: "number",
          example: 300,
        },
        {
          nome: "superata",
          descrizione: "Superata",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "dataesame",
          descrizione: "Data esame",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/formazionistudenti/all",
      descrizione: "Elimina tutte le formazioni studenti",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/formazionistudenti/id/:id",
      descrizione: "Elimina la formazione studente con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id della formazione studente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/formazionistudenti/array",
      descrizione: "Crea una formazione studente per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "formazionistudenti",
          descrizione: "Array di formazioni studenti",
          tipo: "array",
          example: [
            {
              fkformatore: 1,
              fkstudente: 1,
              fkmodulo: 1,
              dataformazione: "2023-01-28",
              minutipresenza: 300,
              superata: true,
              dataesame: "2023-01-28",
            },
            {
              fkformatore: 1,
              fkstudente: 1,
              fkmodulo: 2,
              dataformazione: "2023-01-28",
              minutipresenza: 300,
              superata: true,
              dataesame: "2023-01-28",
            },
          ],
        },
      ],
    },
  ],
  logs: [
    {
      url: "/logs",
      descrizione: "Restituisce tutti i logs",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/logs",
      descrizione: "Crea un nuovo log",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "datetime",
          descrizione: "Data e ora del log",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione del log",
          tipo: "string",
          example: "Log 1",
        },
      ],
    },
    {
      url: "/logs/id/:id",
      descrizione: "Modifica il log con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del log",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "datetime",
          descrizione: "Data e ora del log",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione del log",
          tipo: "string",
          example: "Log 1",
        },
      ],
    },
    {
      url: "/logs/all",
      descrizione: "Elimina tutti i logs",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/logs/id/:id",
      descrizione: "Elimina il log con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del log",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
  ],
  pianiformativi: [
    {
      url: "/pianiformativi",
      descrizione: "Restituisce tutti i piani formativi",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativi",
      descrizione: "Crea un nuovo piano formativo",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del piano formativo",
          tipo: "string",
          example: "Piano formativo 1",
        },
        {
          nome: "edizione",
          descrizione: "Edizione del piano formativo",
          tipo: "string",
          example: "2023-2024",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione del piano formativo",
          tipo: "string",
          example: "Piano formativo 1",
        },
        {
          nome: "livellorischio",
          descrizione: "Livello rischio del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "datacreazione",
          descrizione: "Data creazione del piano formativo",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "durataprevista",
          descrizione: "Durata prevista del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "percentualeobbligatorio",
          descrizione: "Percentuale obbligatorio del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
    },
    {
      url: "/pianiformativi/id/:id",
      descrizione: "Restituisce il piano formativo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativi/edizione/:edizione",
      descrizione: "Restituisce il piano formativo con l'edizione specificata",
      parametri: [
        {
          nome: "edizione",
          descrizione: "Edizione del piano formativo",
          tipo: "string",
          example: "2023-2024",
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativi/all",
      descrizione: "Elimina tutti i piani formativi",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "",
        },
      ],
    },
    {
      url: "/pianiformativi/id/:id",
      descrizione: "Elimina il piano formativo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/pianiformativi/id/:id",
      descrizione: "Modifica il piano formativo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome del piano formativo",
          tipo: "string",
          example: "Piano formativo 1",
        },
        {
          nome: "edizione",
          descrizione: "Edizione del piano formativo",
          tipo: "string",
          example: "2023-2024",
        },
        {
          nome: "descrizione",
          descrizione: "Descrizione del piano formativo",
          tipo: "string",
          example: "Piano formativo 1",
        },
        {
          nome: "livellorischio",
          descrizione: "Livello rischio del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "datacreazione",
          descrizione: "Data creazione del piano formativo",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "durataprevista",
          descrizione: "Durata prevista del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "percentualeobbligatorio",
          descrizione: "Percentuale obbligatorio del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
    },
    {
      url: "/pianiformativi/array",
      descrizione: "Crea un piano formativo per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "pianiformativi",
          descrizione: "Array di piani formativi",
          tipo: "array",
          example: [
            {
              nome: "Piano formativo 1",
              edizione: "2023-2024",
              descrizione: "Piano formativo 1",
              livellorischio: 1,
              datacreazione: "2023-01-28",
              durataprevista: 1,
              percentualeobbligatorio: 1,
            },
            {
              nome: "Piano formativo 2",
              edizione: "2023-2024",
              descrizione: "Piano formativo 2",
              livellorischio: 1,
              datacreazione: "2023-01-28",
              durataprevista: 1,
              percentualeobbligatorio: 1,
            },
          ],
        },
      ],
    },
  ],
  pianiformativimoduli: [
    {
      url: "/pianiformativimoduli",
      descrizione: "Restituisce tutti i piani formativi moduli",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativimoduli",
      descrizione: "Crea un nuovo piano formativo modulo",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "obbligatorio",
          descrizione: "Obbligatorio",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "durata",
          descrizione: "Durata",
          tipo: "number",
          example: 1,
        },
      ],
    },
    {
      url: "/pianiformativimoduli/obbligatorio/:obbligatorio",
      descrizione:
        "Restituisce tutti i piani formativi moduli con obbligatorio specificato",
      parametri: [
        {
          nome: "obbligatorio",
          descrizione: "Obbligatorio",
          tipo: "boolean",
          example: true,
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativimoduli/modulo/:fkmodulo",
      descrizione:
        "Restituisce tutti i piani formativi moduli con modulo specificato",
      parametri: [
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativimoduli/piano-formativo/:fkpianoformativo",
      descrizione:
        "Restituisce tutti i piani formativi moduli con piano formativo specificato",
      parametri: [
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativimoduli/all",
      descrizione: "Elimina tutti i piani formativi moduli",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "",
        },
      ],
    },
    {
      url: "/pianiformativimoduli/id/:id",
      descrizione: "Elimina il piano formativo modulo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del piano formativo modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/pianiformativimoduli/id/:id",
      descrizione: "Modifica il piano formativo modulo con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id del piano formativo modulo",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkmodulo",
          descrizione: "Id del modulo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "obbligatorio",
          descrizione: "Obbligatorio",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "durata",
          descrizione: "Durata",
          tipo: "number",
          example: 1,
        },
      ],
    },
    {
      url: "/pianiformativimoduli/array",
      descrizione:
        "Crea un piano formativo modulo per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "pianiformativimoduli",
          descrizione: "Array di piani formativi moduli",
          tipo: "array",
          example: [
            {
              fkpianoformativo: 1,
              fkmodulo: 1,
              obbligatorio: true,
              durata: 1,
            },
            {
              fkpianoformativo: 1,
              fkmodulo: 2,
              obbligatorio: true,
              durata: 1,
            },
          ],
        },
      ],
    },
  ],
  studenti: [
    {
      url: "/studenti",
      descrizione: "Restituisce tutti gli studenti",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/studenti",
      descrizione: "Crea un nuovo studente",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome dello studente",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome dello studente",
          tipo: "string",
          example: "Rossi",
        },
        {
          nome: "codicefiscale",
          descrizione: "Codice fiscale dello studente",
          tipo: "string",
          example: "RSSMRA00A00A000A",
        },
        {
          nome: "datanascita",
          descrizione: "Data di nascita dello studente",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "sesso",
          descrizione: "Sesso dello studente",
          tipo: "string",
          example: "M",
        },
      ],
    },
    {
      url: "/studenti/id/:codicefiscale",
      descrizione: "Modifica lo studente con l'id specificato",
      parametri: [
        {
          nome: "codicefiscale",
          descrizione: "Codice fiscale dello studente",
          tipo: "string",
          example: "CMPNRT05E14F861L",
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome dello studente",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome dello studente",
          tipo: "string",
          example: "Rossi",
        },
        {
          nome: "codicefiscale",
          descrizione: "Codice fiscale dello studente",
          tipo: "string",
          example: "RSSMRA00A00A000A",
        },
        {
          nome: "datanascita",
          descrizione: "Data di nascita dello studente",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "sesso",
          descrizione: "Sesso dello studente",
          tipo: "string",
          example: "M",
        },
      ],
    },
    {
      url: "/studenti/all",
      descrizione: "Elimina tutti gli studenti",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/studenti/id/:codicefiscale",
      descrizione: "Elimina lo studente con il codice fiscale specificato",
      parametri: [
        {
          nome: "codicefiscale",
          descrizione: "Codice fiscale dello studente",
          tipo: "string",
          example: "CMPNRT05E14F861L",
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/studenti/array",
      descrizione: "Crea uno studente per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "studenti",
          descrizione: "Array di studenti",
          tipo: "array",
          example: [
            {
              nome: "Mario",
              cognome: "Rossi",
              codicefiscale: "RSSMRA00A00A000A",
              datanascita: "2023-01-28",
              sesso: "M",
            },
            {
              nome: "Luigi",
              cognome: "Verdi",
              codicefiscale: "VRDLGU00A00A000A",
              datanascita: "2023-01-28",
              sesso: "M",
            },
          ],
        },
      ],
    },
  ],
  utenti: [
    {
      url: "/utenti",
      descrizione: "Restituisce tutti gli utenti",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/utenti",
      descrizione: "Crea un nuovo utente",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "nome",
          descrizione: "Nome dell'utente",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome dell'utente",
          tipo: "string",
          example: "Rossi",
        },
        {
          nome: "username",
          descrizione: "Username dell'utente",
          tipo: "string",
          example: "mario.rossi",
        },
        {
          nome: "password",
          descrizione: "Password dell'utente",
          tipo: "string",
          example: "password",
        },
        {
          nome: "lastlogin",
          descrizione: "Ultimo login dell'utente",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "enabled",
          descrizione: "Abilitato dell'utente",
          tipo: "boolean",
          example: true,
        },
        {
          nome: "ruolo",
          descrizione: "Ruolo dell'utente",
          tipo: "string",
          example: "admin"
        },
      ],
    },
    {
      url: "/utenti/id/:id",
      descrizione: "Modifica l'utente con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id dell'utente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "nome",
          descrizione: "Nome dell'utente",
          tipo: "string",
          example: "Mario",
        },
        {
          nome: "cognome",
          descrizione: "Cognome dell'utente",
          tipo: "string",
          example: "Rossi",
        },
        {
          nome: "username",
          descrizione: "Username dell'utente",
          tipo: "string",
          example: "mario.rossi",
        },
        {
          nome: "password",
          descrizione: "Password dell'utente",
          tipo: "string",
          example: "password",
        },
        {
          nome: "lastlogin",
          descrizione: "Ultimo login dell'utente",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "enabled",
          descrizione: "Abilitato dell'utente",
          tipo: "boolean",
          example: true,
        },
      ],
    },
    {
      url: "/utenti/all",
      descrizione: "Elimina tutti gli utenti",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/utenti/id/:id",
      descrizione: "Elimina l'utente con l'id specificato",
      parametri: [
        {
          nome: "id",
          descrizione: "Id dell'utente",
          tipo: "number",
          example: 1,
        },
      ],
      richiesta: "DELETE",
      body: [],
    },
    {
      url: "/utenti/array",
      descrizione: "Crea un utente per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "utenti",
          descrizione: "Array di utenti",
          tipo: "array",
          example: [
            {
              nome: "Mario",
              cognome: "Rossi",
              username: "mario.rossi",
              password: "password",
              lastlogin: "2023-01-28",
              enabled: true,
            },
            {
              nome: "Luigi",
              cognome: "Verdi",
              username: "luigi.verdi",
              password: "password",
              lastlogin: "2023-01-28",
              enabled: true,
            },
          ],
        },
      ],
    },
  ],
  pianiformativistudenti: [
    {
      url: "/pianiformativistudenti",
      descrizione: "Restituisce tutti i piani formativi studenti",
      parametri: [],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativistudenti",
      descrizione: "Crea un nuovo piano formativo studente",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "dataiscrizione",
          descrizione: "Data iscrizione",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "datacertificazione",
          descrizione: "Data certificazione",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/pianiformativistudenti/dataiscrizione/:dataiscrizione",
      descrizione:
        "Restituisce tutti i piani formativi studenti con data iscrizione specificata",
      parametri: [
        {
          nome: "dataiscrizione",
          descrizione: "Data iscrizione",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativistudenti/datacertificazione/:datacertificazione",
      descrizione:
        "Restituisce tutti i piani formativi studenti con data certificazione specificata",
      parametri: [
        {
          nome: "datacertificazione",
          descrizione: "Data certificazione",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
      richiesta: "GET",
      body: [],
    },
    {
      url: "/pianiformativistudenti/all",
      descrizione: "Elimina tutti i piani formativi studenti",
      parametri: [],
      richiesta: "DELETE",
      body: [
        {
          nome: "secret",
          descrizione: "Password segreta",
          tipo: "string",
          example: "andtrent",
        },
      ],
    },
    {
      url: "/pianiformativistudenti/studente-pianoformativo-dataiscrizione/:fkstudente/:fkpianoformativo/:dataiscrizione",
      descrizione: "Modifica il piano formativo studente",
      parametri: [
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "dataiscrizione",
          descrizione: "Data iscrizione",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
      richiesta: "PUT",
      body: [
        {
          nome: "fkstudente",
          descrizione: "Id dello studente",
          tipo: "number",
          example: 1,
        },
        {
          nome: "fkpianoformativo",
          descrizione: "Id del piano formativo",
          tipo: "number",
          example: 1,
        },
        {
          nome: "dataiscrizione",
          descrizione: "Data iscrizione",
          tipo: "date",
          example: "2023-01-28",
        },
        {
          nome: "datacertificazione",
          descrizione: "Data certificazione",
          tipo: "date",
          example: "2023-01-28",
        },
      ],
    },
    {
      url: "/pianiformativistudenti/array",
      descrizione:
        "Crea un piano formativo studente per ogni elemento dell'array",
      parametri: [],
      richiesta: "POST",
      body: [
        {
          nome: "pianiformativistudenti",
          descrizione: "Array di piani formativi studenti",
          tipo: "array",
          example: [
            {
              fkstudente: 1,
              fkpianoformativo: 1,
              dataiscrizione: "2023-01-28",
              datacertificazione: "2023-01-28",
            },
            {
              fkstudente: 1,
              fkpianoformativo: 2,
              dataiscrizione: "2023-01-28",
              datacertificazione: "2023-01-28",
            },
          ],
        },
      ],
    },
  ],
};

const keys = Object.keys(richieste);

//request for all modules
async function getDB(url, parameters) {
  let tmp = url.split(":");
  url = tmp[0] + ":" + tmp[1];
  for (let i = 2; i < tmp.length; i++) {
    url += parameters[i - 2] + "/";
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
  });

  return await response.json();
}

async function postDB(url, parameters, body) {
  let tmp = url.split(":");
  url = tmp[0] + ":" + tmp[1];
  for (let i = 2; i < tmp.length; i++) {
    url += parameters[i - 2] + "/";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: body == {} ? "" : JSON.stringify(body),
  });

  return await response.json();
}

async function putDB(url, parameters, body) {
  let tmp = url.split(":");
  url = tmp[0] + ":" + tmp[1];
  for (let i = 2; i < tmp.length; i++) {
    url += parameters[i - 2] + "/";
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: body == {} ? "" : JSON.stringify(body),
  });

  return await response.json();
}

async function deleteDB(url, parameters, body) {
  let tmp = url.split(":");
  url = tmp[0] + ":" + tmp[1];
  for (let i = 2; i < tmp.length; i++) {
    url += parameters[i - 2] + "/";
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
    body: body == {} ? "" : JSON.stringify(body),
  });

  return await response.json();
}
