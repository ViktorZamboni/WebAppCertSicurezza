let introJS = introJs();

introJS.setOptions({
  showBullets: false,
  dontShowAgain: true,
  disableInteraction: true,
  exitOnOverlayClick: false,
  steps: [
    {
      title: "Tutorial",
      intro: "Benvenuto nel tutorial di utilizzo della pagina help",
    },
    {
      title: "Richieste",
      element: document.getElementById("tabella"),
      intro: "In questa tabella sono presenti tutte le richieste che puoi fare",
    },
    {
      title: "Ordinare le richieste",
      element: document.getElementById("tabella").getElementsByTagName("th")[0],
      intro: "Puoi ordinare le richieste cliccando sulle intestazioni",
    },
    {
      title: "Mandare una richiesta",
      element: document
        .getElementById("tabella")
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[0],
      intro: "Per fare una richiesta clicca sulla riga corrispondente",
    },
    {
      title: "Visualizzare il risultato",
      element: document
        .getElementById("tabella")
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[0],
      intro:
        "Puoi vedere il risultato della richiesta aprendo le dev tools (F12) e andando nella sezione Console",
    },
    {
      title: "Init",
      element: document
        .getElementById("tabella")
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[0],
      intro:
        "Per poter usare il database è necessario che sia inizializzato, se lo è già non serve effettuare un'altra inizializzazione. \nSe si effettua un'altra inizializzazione i dati presenti sul database verranno cancellati",
    },
    {
      title: "Sidebar",
      element: document.getElementById("sidebarCollapseButton"),
      intro:
        "Puoi visualizzare una sidebar che contiene le altre sezioni della pagina cliccando sul pulsante in alto a sinistra",
    },
    {
      title: "Sezioni",
      element: document.getElementById("sidebar-elements"),
      intro: "Qui puoi trovare altre sezioni della pagina",
    },
    {
      title: "Cambiare sezione",
      element: document
        .getElementById("sidebar-elements")
        .getElementsByTagName("li")[5],
      intro:
        "Puoi cambiare sezione cliccando su uno dei degli elementi della sidebar",
    },
    {
      title: "Rappresentazione tabelle",
      element: document.getElementById("rappresentazione-tabelle"),
      intro: "Qui puoi vedere una rappresentazione delle tabelle",
    },
    {
      title: "Descizione tabelle",
      element: document.getElementById("descrizioni-tabelle"),
      intro: "Infine qui puoi vedere una descrizione delle tabelle",
    },
    {
      title: "Fine tutorial",
      intro: "Ora sei pronto per fare le tue richieste!",
    },
  ],
});

introJS.onbeforechange(async function () {
  if (this.currentStep() === 7 || this.currentStep() === 8) {
    if (sidebar.style.width === "0px") {
      toggleSidebar();
        await new Promise((resolve) => setTimeout(resolve, 450));
    }
  } else if (sidebar.style.width !== "0px") {
    toggleSidebar();
    await new Promise((resolve) => setTimeout(resolve, 450));
  }
});
