const cc = console.log;

//variables not related to users

let barTypesAll = ["Full", "Half", "Percent"];

//variables for individual starBars, allows for accessing them dynamically
let barVars = {
  getStarBar: {
    Full: document.getElementById("starBarFull"),
    Half: document.getElementById("starBarHalf"),
    Percent: document.getElementById("starBarPercent"),
  },
  getStarRatingText: {
    Full: document.getElementById("starRatingTextFull"),
    Half: document.getElementById("starRatingTextHalf"),
    Percent: document.getElementById("starRatingTextPercent"),
  },
  //from mouseenter
  currentStarId: {
    Full: "",
    Half: "",
    Percent: "",
  },
  userStarRating: {
    Full: 0,
    Half: 0,
    Percent: 0,
  },
  starArray: {
    Full: [],
    Half: [],
    Percent: [],
  },

  boundRect: {
    Half: {
      //true = is half, false = is full, null = not set yet
      isHalf: null,
      left: null,
      width: null,
    },
    Percent: {
      left: null,
      width: null,
    },
  },
};

///END OF VARIABLES SECTION

function createStarsSingleUser(barType) {
  let barTypelc = barType.toLowerCase();

  for (i = 1; i <= 5; i++) {
    let newStar = document.createElement("DIV");
    newStar.classList.add("star");
    barVars.getStarBar[barType].append(newStar);
    newStar.setAttribute("id", `${barTypelc}-star${i}`);
    barVars.starArray[barType].push(newStar.id);

    newStar.addEventListener("mouseenter", (e) => starMouseEnter(e, barType));

    newStar.addEventListener("click", (e) => starMouseClick(e, barType));

    if (barType !== "Full") {
      newStar.addEventListener("mousemove", (e) => starMousemove(e, barType));
    }
  }
}

barTypesAll.map((s) => createStarsSingleUser(s));

//ADD MOUSELEAVE TO ALL STARBARS
barTypesAll.map((barType) => {
  barVars.getStarBar[barType].addEventListener("mouseleave", () =>
    starMouseLeave(barType)
  );
});

function starMouseEnter(e, barType) {
  let currentStarIndex = -1;

  barVars.currentStarId[barType] = e.target.id;

  currentStarIndex = barVars.starArray[barType].indexOf(
    barVars.currentStarId[barType]
  );

  barVars.starArray[barType].map((s, i) => {
    if (barType === "Percent") {
      document.getElementById(s).style.backgroundImage = "none";
    }
    if (barType === "Half") {
      document.getElementById(s).classList.remove("starYellowHalf");
    }
    if (i < currentStarIndex) {
      document.getElementById(s).classList.add("starYellow");
    } else if (i > currentStarIndex) {
      document.getElementById(s).classList.remove("starYellow");
    }
  });

  switch (barType) {
    case "Full":
      document
        .getElementById(barVars.currentStarId[barType])
        .classList.add("starYellow");
      break;
    case "Half":
      barVars.boundRect[barType].left = document
        .getElementById(barVars.currentStarId[barType])
        .getBoundingClientRect().left;
      barVars.boundRect[barType].width = document
        .getElementById(barVars.currentStarId[barType])
        .getBoundingClientRect().width;

      document
        .getElementById(barVars.currentStarId[barType])
        .classList.remove("starYellow");
      document
        .getElementById(barVars.currentStarId[barType])
        .classList.remove("starYellowHalf");
      break;
    case "Percent":
      barVars.boundRect[barType].left = document
        .getElementById(barVars.currentStarId[barType])
        .getBoundingClientRect().left;
      barVars.boundRect[barType].width = document
        .getElementById(barVars.currentStarId[barType])
        .getBoundingClientRect().width;

      document
        .getElementById(barVars.currentStarId[barType])
        .classList.remove("starYellow");
      break;
  }
}

function starMousemove(e, barType) {
  switch (barType) {
    case "Half":
      if (
        e.clientX - barVars.boundRect[barType].left <=
        barVars.boundRect[barType].width / 2
      ) {
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.remove("starYellow");
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.add("starYellowHalf");
      } else {
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.remove("starYellowHalf");
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.add("starYellow");
      }
      break;
    case "Percent":
      cc("client x " + e.clientX);
      cc("star left " + barVars.boundRect[barType].left);
      cc(`${e.clientX - barVars.boundRect[barType].left}px`);
      document.getElementById(
        barVars.currentStarId[barType]
      ).style.backgroundImage = `linear-gradient(90deg, goldenrod ${
        e.clientX - barVars.boundRect[barType].left
      }px, white ${e.clientX - barVars.boundRect[barType].left}px`;

      break;
  }
}

function starMouseLeave(barType) {
  barVars.starArray[barType].map((s, i) => {
    if (barType === "Percent") {
      document.getElementById(s).style.backgroundImage = "none";
    }
    if (barType === "Half") {
      document.getElementById(s).classList.remove("starYellowHalf");
    }

    document.getElementById(s).classList.remove("starYellow");

    if (i + 1 < barVars.userStarRating[barType]) {
      document.getElementById(s).classList.add("starYellow");
    }
    if (i + 1 === Math.ceil(barVars.userStarRating[barType])) {
      if (barType === "Half" && barVars.boundRect.Half.isHalf) {
        document.getElementById(s).classList.add("starYellowHalf");
      } else if (barType !== "Percent") {
        document.getElementById(s).classList.add("starYellow");
      } else if (barType === "Percent") {
        let mousePos =
          Number(
            (
              barVars.userStarRating[barType] -
              Math.floor(barVars.userStarRating[barType])
            ).toFixed(2)
          ) * barVars.boundRect[barType].width;
        document.getElementById(
          s
        ).style.backgroundImage = `linear-gradient(90deg, goldenrod ${mousePos}px, white ${mousePos}px`;
      }
    }
  });
}

function starMouseClick(e, barType) {
  switch (barType) {
    case "Full":
      //Add 1 because the clicked star is always full
      barVars.userStarRating[barType] = 1;

      break;
    case "Half":
      if (
        e.clientX - barVars.boundRect[barType].left <=
        barVars.boundRect[barType].width / 2
      ) {
        barVars.boundRect.Half.isHalf = true;
        barVars.userStarRating[barType] = 0.5;
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.remove("starYellow");
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.add("starYellowHalf");
      } else {
        barVars.boundRect.Half.isHalf = false;
        barVars.userStarRating[barType] = 1;
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.remove("starYellowHalf");
        document
          .getElementById(barVars.currentStarId[barType])
          .classList.add("starYellow");
      }
      break;

    case "Percent":
      barVars.userStarRating[barType] =
        (e.clientX - barVars.boundRect[barType].left) /
        barVars.boundRect[barType].width;

      break;
  }

  barVars.userStarRating[barType] += barVars.starArray[barType].indexOf(
    e.target.id
  );

  barVars.getStarRatingText[barType].innerText =
    barVars.userStarRating[barType];
}
