const basicArray = [
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
let exerciceArray = [];

// Get stored exercices array
(() => {
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);
  } else {
    exerciceArray = basicArray;
  }
})();

const utils = {
  pageContent: function (titre, content, btn) {
    document.querySelector("h1").innerHTML = titre;
    document.querySelector("main").innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  handleEventMinutes: function () {
    exerciceArray.map((exo) => {
      document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener("input", (e) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    let position = 0;
    exerciceArray.map((exo) => {
      document.querySelectorAll(".arrow").forEach((arrow) => {
        arrow.addEventListener("click", (e) => {
          if (exo.pic == e.target.dataset.pic) {
            if (position !== 0) {
              [exerciceArray[position], exerciceArray[position - 1]] = [
                exerciceArray[position - 1],
                exerciceArray[position],
              ];
              this.store();
              page.lobby();
            } else {
              page.lobby();
            }
          } else {
            position++;
          }
        });
      });
    });
  },

  store: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};

const page = {
  lobby: function () {
    let mapArray = exerciceArray.map((exo) => {
      return `
        <li>
          <div class="card-header">
            <input type="number" id="${exo.pic}" min="1" max="10" value="${exo.min}" />
            <span>min</span>
          </div>
          <img src="./img/${exo.pic}.png" alt="exercice de yoga"/>
          <i class="fas fa-arrow-alt-circle-left arrow" data-pic="${exo.pic}"></i>
          <i class="fas fa-times-circle deleteBtn" data-pic="${exo.pic}"></i>
        </li>
      `;
    });

    utils.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Commencer <i class='far fa-play-cirlce></i></button>'"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
  },
  routine: function () {
    utils.pageContent(null, null, null);
  },
  finish: function () {
    utils.pageContent(null, null, null);
  },
};

page.lobby();
