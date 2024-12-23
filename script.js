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
    let newBtn = document.createElement("BUTTON");
    newBtn.setAttribute("id", `${barTypelc}-star${i}`);

    let newStar = document.createElement("DIV");
    newStar.classList.add("star");

    newBtn.append(newStar);
    barVars.getStarBar[barType].append(newBtn);

    barVars.starArray[barType].push(newBtn.id);

    newBtn.addEventListener("mouseenter", (e) => starMouseEnter(e, barType));

    newBtn.addEventListener("click", (e) => starMouseClick(e, barType));

    if (barType !== "Full") {
      newBtn.addEventListener("mousemove", (e) => starMousemove(e, barType));
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
      //remove gradient from percent stars
      document.getElementById(s).children[0].style.backgroundImage = "none";
    }
    if (barType === "Half") {
      document.getElementById(s).children[0].classList.remove("starYellowHalf");
    }
    if (i < currentStarIndex) {
      document.getElementById(s).children[0].classList.add("starYellow");
    } else if (i > currentStarIndex) {
      document.getElementById(s).children[0].classList.remove("starYellow");
    }
  });

  switch (barType) {
    case "Full":
      document
        .getElementById(barVars.currentStarId[barType])
        .children[0].classList.add("starYellow");
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
        .children[0].classList.remove("starYellow");
      document
        .getElementById(barVars.currentStarId[barType])
        .children[0].classList.remove("starYellowHalf");
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
        .children[0].classList.remove("starYellow");
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
          .children[0].classList.remove("starYellow");
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.add("starYellowHalf");
      } else {
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.remove("starYellowHalf");
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.add("starYellow");
      }
      break;
    case "Percent":
      cc("client x " + e.clientX);
      cc("star left " + barVars.boundRect[barType].left);
      cc(`${e.clientX - barVars.boundRect[barType].left}px`);
      document.getElementById(
        barVars.currentStarId[barType]
      ).children[0].style.backgroundImage = `linear-gradient(90deg, goldenrod ${
        e.clientX - barVars.boundRect[barType].left
      }px, white ${e.clientX - barVars.boundRect[barType].left}px`;

      break;
  }
}

function starMouseLeave(barType) {
  barVars.starArray[barType].map((s, i) => {
    if (barType === "Percent") {
      document.getElementById(s).children[0].style.backgroundImage = "none";
    }
    if (barType === "Half") {
      document.getElementById(s).children[0].classList.remove("starYellowHalf");
    }

    document.getElementById(s).children[0].classList.remove("starYellow");

    if (i + 1 < barVars.userStarRating[barType]) {
      document.getElementById(s).children[0].classList.add("starYellow");
    }
    if (i + 1 === Math.ceil(barVars.userStarRating[barType])) {
      if (barType === "Half" && barVars.boundRect.Half.isHalf) {
        document.getElementById(s).children[0].classList.add("starYellowHalf");
      } else if (barType !== "Percent") {
        document.getElementById(s).children[0].classList.add("starYellow");
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
        ).children[0].style.backgroundImage = `linear-gradient(90deg, goldenrod ${mousePos}px, white ${mousePos}px`;
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
          .children[0].classList.remove("starYellow");
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.add("starYellowHalf");
      } else {
        barVars.boundRect.Half.isHalf = false;
        barVars.userStarRating[barType] = 1;
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.remove("starYellowHalf");
        document
          .getElementById(barVars.currentStarId[barType])
          .children[0].classList.add("starYellow");
      }

      break;

    case "Percent":
      barVars.userStarRating[barType] = Number(
        (
          (e.clientX - barVars.boundRect[barType].left) /
          barVars.boundRect[barType].width
        ).toFixed(2)
      );

      break;
  }

  barVars.userStarRating[barType] += barVars.starArray[barType].indexOf(
    e.target.id
  );

  barVars.getStarRatingText[barType].innerText =
    barVars.userStarRating[barType];
}
