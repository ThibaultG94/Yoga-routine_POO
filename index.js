let exerciceArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];

const utils = {
  pageContent: function (titre, content, btn) {
    document.querySelector("h1").innerHTML = titre;
    document.querySelector("main").innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
};

const page = {
  lobby: function () {
    let mapArray = exerciceArray
      .map((exercice) => {
        return `
        <li>
          <div class='card-header'>
            <input type='number' id='${exercice.pic}' min='1' max='10' value='${exercice.min}'>
            <span>min</span>
          </div>
          <img src="./img/${exercice.pic}.png" alt="Exercice de Yoga">
          <i class='fas fa-arrow-circle-left arrow' data-pic='${exercice.pic}'></i>
          <i class='fas fa-times-circle deleteBtn' data-pic='${exercice.pic}'></i>
        </li>
      `;
      })
      .join("");

    utils.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Commencer <i class='far fa-play-circle'></i></button>"
    );
  },

  routine: function () {
    utils.pageContent("Routine", "mes exos", null);
  },

  finish: function () {
    utils.pageContent(
      "C'est terminé !",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circle'></i></button>"
    );
  },
};

page.lobby();
