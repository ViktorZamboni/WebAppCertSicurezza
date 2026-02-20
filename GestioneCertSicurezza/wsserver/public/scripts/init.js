//URL of the page
const url = window.location.href;
//Intro div
const intro = document.getElementById("intro");

//User that needs to be inserted in the DB for the test
const user = {
  username: "admin",
  password: "root",
};

//Login tokens
let token = "";
let renewToken = "";
let updateToken;

//Variable that indicates if the DB is initializing
let databaseInitializing = false;

setInterval(() => {
  if (!databaseInitializing) {
    intro.classList.add("invisible");
  } else {
    intro.classList.remove("invisible");
  }
}, 200);

//Login to the DB
postDB(url + "/login", [], user).then((json) => {
  if (!json.error) {
    token = json.data["access-token"];
    renewToken = json.data["refresh-token"];
    richieste.app[2].body[0].example = renewToken;
    introJS.start();

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
  } else {
    introJS.start();
  }
});