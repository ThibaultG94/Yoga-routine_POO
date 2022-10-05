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

class Exercice {
  constructor() {
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.seconds = 0;
  }

  updateCountdown = () => {
    if (this.seconds < 10) this.seconds = "0" + this.seconds;
    setTimeout(() => {
      if (this.minutes == 0 && this.seconds == 0) {
        this.index++;
        if (this.index < exerciceArray.length) {
          this.minutes = exerciceArray[this.index].min;
          this.seconds = 0;
          this.updateCountdown();
        } else {
          page.finish();
        }
      } else if (this.seconds == 0) {
        this.minutes--;
        this.seconds = 59;
        this.updateCountdown();
      } else {
        this.seconds--;
        this.updateCountdown();
      }
    }, 1000);

    return (document.querySelector("main").innerHTML = `
        <div class="exercice-container">
          <p>${this.minutes}:${this.seconds}</p>
          <img src="./img/${this.index}.png" 
          alt="exercice de yoga n°${this.index + 1}"/>
          <div>${this.index + 1}/${exerciceArray.length}</div>
        </div>
        `);
  };
}

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

  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const newArray = exerciceArray.filter((exo) => {
          if (exo.pic != e.target.dataset.pic) return exo;
        });
        exerciceArray = newArray;
        page.lobby();
        this.store();
      });
    });
  },

  reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
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
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
    start.addEventListener("click", () => this.routine());
  },
  routine: function () {
    const exercice = new Exercice();
    utils.pageContent("Routine", exercice.updateCountdown(), null);
  },
  finish: function () {
    utils.pageContent(
      "C'est terminé !",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fas fa-times-circle'></button>"
    );

    start.addEventListener("click", () => this.routine());
    reboot.addEventListener("click", () => utils.reboot());
  },
};

page.lobby();
