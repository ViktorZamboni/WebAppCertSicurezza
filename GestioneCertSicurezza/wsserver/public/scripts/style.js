//const bottoni = document.getElementById("bottoni");
const sidebar = document.getElementById("sidebar");
const overlaySidebar = document.getElementById("overlay-sidebar");
const sidebarElements = document.getElementById("sidebar-elements").children;
sidebar.style.width = "0px";
overlaySidebar.style.display = "none";
overlaySidebar.addEventListener("click", (event) => {
  if (event.target === overlaySidebar) {
    toggleSidebar();
  }
});

for (let i = 0; i < sidebarElements.length; i++) {
  sidebarElements[i].addEventListener("click", (event) => {
    let element = event.target;
    for (let i = 0; i < sidebarElements.length; i++) {
      sidebarElements[i].classList.remove("active");
    }
    element.classList.add("active");
    createTabella(element.innerText.toLowerCase().replaceAll(" ", ""));
    tbody = document.createElement("tbody");
    originalArray = Array.from(tbody.children);
  });
}

//tabella
const tabella = document.getElementById("tabella");
let currentTab = "app";

function createTabella(type) {
  currentTab = type;
  let tbody = tabella.getElementsByTagName("tbody")[0];
  if (tbody) {
    tbody.remove();
  }
  for (let i = 0; i < keys.length; i++) {
    if (type === keys[i]) {
      addToTable(richieste[keys[i]]);
    }
  }
}

createTabella("app");

function addToTable(listaRichieste) {
  let tbody = document.createElement("tbody");
  for (let i = 0; i < listaRichieste.length; i++) {
    let riga = document.createElement("tr");
    let urlRichiesta = document.createElement("td");
    let descrizioneRichiesta = document.createElement("td");
    let parametriRichiesta = document.createElement("td");
    let richiestaRichiesta = document.createElement("td");
    let bodyRichiesta = document.createElement("td");
    let request = listaRichieste[i];

    urlRichiesta.className = "text-center";
    descrizioneRichiesta.className = "text-center";
    parametriRichiesta.className = "text-center";
    richiestaRichiesta.className = "text-center";
    bodyRichiesta.className = "text-center";

    urlRichiesta.innerText = request.url;
    descrizioneRichiesta.innerText = request.descrizione;
    richiestaRichiesta.innerText = request.richiesta;
    if (request.parametri.length > 0) {
      for (let i = 0; i < request.parametri.length; i++) {
        parametriRichiesta.innerText +=
          request.parametri[i].nome + " (" + request.parametri[i].tipo + ")";
        if (i < request.parametri.length - 1)
          parametriRichiesta.innerText += ", \n";
      }
    } else {
      parametriRichiesta.innerText = "Nessun parametro";
    }
    if (request.body.length > 0) {
      for (let i = 0; i < request.body.length; i++) {
        bodyRichiesta.innerText +=
          JSON.stringify(request.body[i].nome) +
          " (" +
          request.body[i].tipo +
          ")";
        if (i < request.body.length - 1) bodyRichiesta.innerText += ", \n";
      }
    } else {
      bodyRichiesta.innerText = "Nessun body";
    }

    riga.addEventListener("click", () => {
      let parametri = [];
      for (let i = 0; i < request.parametri.length; i++) {
        parametri.push(request.parametri[i].example);
      }
      let body = {};
      for (let i = 0; i < request.body.length; i++) {
        body[request.body[i].nome] = request.body[i].example;
      }
      if (request.body.length > 0 && Array.isArray(request.body[0].example)) {
        body = request.body[0].example;
      }

      switch (request.richiesta) {
        case "GET": {
          getDB(url + request.url, parametri).then((result) =>
            console.log(result)
          );
          break;
        }
        case "POST": {
          if (request.url === "/init") {
            databaseInitializing = true;
          }
          postDB(url + request.url, parametri, body).then((result) => {
            console.log(result);
            if (request.url === "/init") {
              databaseInitializing = false;
              postDB(url + "/login", [], user).then((json) => {
                console.log(json);
                if (!json.error) {
                  token = json.data["access-token"];
                  renewToken = json.data["refresh-token"];
                  richieste.app[2].body[0].example = renewToken;
                  clearInterval(updateToken);
                  updateToken = setInterval(() => {
                    //Login to the DB
                    postDB(url + "/login", [], user).then((json) => {
                      if (!json.error) {
                        token = json.data["access-token"];
                        renewToken = json.data["refresh-token"];
                        richieste.app[2].body[0].example = renewToken;
                      }
                    });
                  }, 1000);
                }
              });
            } else if (request.url === "/login") {
              if (!result.error) {
                token = result.data["access-token"];
                renewToken = result.data["refresh-token"];
                richieste.app[2].body[0].example = renewToken;
              }
            }
          });
          break;
        }
        case "PUT": {
          putDB(url + request.url, parametri, body).then((result) =>
            console.log(result)
          );
          break;
        }
        case "DELETE": {
          deleteDB(url + request.url, parametri, body).then((result) =>
            console.log(result)
          );
          break;
        }
      }
    });
    riga.appendChild(urlRichiesta);
    riga.appendChild(descrizioneRichiesta);
    riga.appendChild(parametriRichiesta);
    riga.appendChild(richiestaRichiesta);
    riga.appendChild(bodyRichiesta);
    riga.classList = "w-100 h-100 text-white";
    tbody.appendChild(riga);
  }
  tabella.appendChild(tbody);
}

//sort
let sortStatus = 0;
let precColumn = -1;
const theadRow = tabella.getElementsByTagName("thead")[0].children[0];

function sort(column) {
  const tbody = tabella.getElementsByTagName("tbody")[0];
  const array = Array.from(tbody.children);
  sortStatus = precColumn == column ? (sortStatus + 1) % 3 : 1;
  Array.from(theadRow.children).forEach((child) => {
    if (child.children[0] !== theadRow.children[column].children[0]) {
      child.children[0].classList = "fa-solid fa-sort";
    }
  });

  switch (sortStatus) {
    case 0:
      createTabella(currentTab);
      theadRow.children[column].children[0].classList = "fa-solid fa-sort";
      break;
    case 1:
      theadRow.children[column].children[0].classList =
        "fa-solid fa-caret-down";
      array.sort((a, b) => {
        return a.children[column].innerText
          .toLowerCase()
          .localeCompare(b.children[column].innerText.toLowerCase());
      });
      tbody.innerHTML = "";
      array.forEach((row) => tbody.appendChild(row));
      break;
    case 2:
      theadRow.children[column].children[0].classList = "fa-solid fa-caret-up";
      tbody.innerHTML = "";
      array.reverse().forEach((row) => tbody.appendChild(row));
      break;
  }
  precColumn = column;
}

function applyEffect(column) {
  //click animation on thead column border and box shadow
  let animation = new TimelineMax();
  animation.fromTo(
    theadRow.children[column].children[0],
    0.5,
    { scale: 1 },
    { scale: 1.2 },
    0
  );
  animation.play;
}

/*const overlay = document.querySelector(".overlay");
const overlayContent = document.querySelector(".overlay-content");

gsap.set(overlayContent, { y: "-50px", opacity: 0 });

gsap.to(overlay, { duration: 0.5, opacity: 1 });
gsap.to(overlayContent, { duration: 0.5, y: "0", opacity: 1, delay: 0.5 });

const myButton = document.querySelector("#myButton");

myButton.addEventListener("click", () => {
  gsap.to(myButton, { duration: 0.5, opacity: 0, y: -50 });
});

myButton.addEventListener("mouseenter", () => {
  gsap.to(myButton, { duration: 0.2, scale: 1.2 });
});

myButton.addEventListener("mouseleave", () => {
  gsap.to(myButton, { duration: 0.2, scale: 1 });
});*/

//typed animation
let tl = new TimelineMax({
  paused: true,
});
// letter animation
tl.fromTo(
  ".typed",
  3,
  {
    width: "0",
  },
  {
    width: "100%",
    ease: SteppedEase.config(37),
  },
  0
);
// text cursor animation
tl.fromTo(
  ".typed",
  0.5,
  {
    "border-right": "2px solid #fff",
  },
  {
    "border-right": "0px solid transparent",
    repeat: 8,
    ease: SteppedEase.config(37),
  },
  0
);

tl.play();

function toggleSidebar() {
  //if sidebar is open close it with animation and viceversa
  if (sidebar.style.width === "0px") {
    gsap.to(sidebar, {
      duration: 0.5,
      width: window.innerWidth < 768 ? "100%" : "280px",
      padding: "20px",
    });
    overlaySidebar.style.display = "block";
  } else {
    gsap.to(sidebar, { duration: 0.5, width: "0px", padding: "0px" });
    setTimeout(() => {
      overlaySidebar.style.display = "none";
    }, 500);
  }
}
