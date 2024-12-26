const cc = console.log;

let barTypesAll = ["Full", "Half", "Percent"];
let getCurrentStarId; //used to keep code tidy by making it shorter where star ID (button) is accessed
let getCurrentStarChild; //used to keep code tidy by making it shorter when star (button's child) is accessed

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
    getCurrentStarChild = document.getElementById(s).children[0];

    if (barType === "Percent") {
      //remove gradient from percent stars
      getCurrentStarChild.style.backgroundImage = "none";
    }
    if (barType === "Half") {
      getCurrentStarChild.classList.remove("starHalf-" + (i + 1));
    }
    if (i < currentStarIndex) {
      getCurrentStarChild.classList.add("starFull-" + (i + 1));
    } else if (i > currentStarIndex) {
      getCurrentStarChild.classList.remove("starFull-" + (i + 1));
    }
  });

  getCurrentStarId = document.getElementById(barVars.currentStarId[barType]);

  switch (barType) {
    case "Full":
      getCurrentStarId.children[0].classList.add(
        "starFull-" + (currentStarIndex + 1)
      );
      break;
    case "Half":
      barVars.boundRect[barType].left =
        getCurrentStarId.getBoundingClientRect().left;
      barVars.boundRect[barType].width =
        getCurrentStarId.getBoundingClientRect().width;

      getCurrentStarId.children[0].classList.remove(
        "starFull-" + (currentStarIndex + 1)
      );
      getCurrentStarId.children[0].classList.remove(
        "starHalf-" + (currentStarIndex + 1)
      );
      break;
    case "Percent":
      barVars.boundRect[barType].left =
        getCurrentStarId.getBoundingClientRect().left;
      barVars.boundRect[barType].width =
        getCurrentStarId.getBoundingClientRect().width;

      getCurrentStarId.children[0].classList.remove(
        "starFull-" + (currentStarIndex + 1)
      );
      break;
  }
}

function starMousemove(e, barType) {
  let currentStarIndex = barVars.starArray[barType].indexOf(
    barVars.currentStarId[barType]
  );

  switch (barType) {
    case "Half":
      if (
        e.clientX - barVars.boundRect[barType].left <=
        barVars.boundRect[barType].width / 2
      ) {
        getCurrentStarId.children[0].classList.remove(
          "starFull-" + (currentStarIndex + 1)
        );
        getCurrentStarId.children[0].classList.add(
          "starHalf-" + (currentStarIndex + 1)
        );
      } else {
        getCurrentStarId.children[0].classList.remove(
          "starHalf-" + (currentStarIndex + 1)
        );
        getCurrentStarId.children[0].classList.add(
          "starFull-" + (currentStarIndex + 1)
        );
      }
      break;
    case "Percent":
      getCurrentStarId.children[0].style.backgroundImage = `linear-gradient(90deg, var(--star-color-${
        currentStarIndex + 1
      }) ${e.clientX - barVars.boundRect[barType].left}px, white ${
        e.clientX - barVars.boundRect[barType].left
      }px`;

      break;
  }
}

function starMouseLeave(barType) {
  let currentStarIndex = barVars.starArray[barType].indexOf(
    barVars.currentStarId[barType]
  );

  barVars.starArray[barType].map((s, i) => {
    getCurrentStarChild = document.getElementById(s).children[0];

    if (barType === "Percent") {
      getCurrentStarChild.style.backgroundImage = "none";
    }
    if (barType === "Half") {
      getCurrentStarChild.classList.remove("starHalf-" + (i + 1));
    }

    getCurrentStarChild.classList.remove("starFull-" + (i + 1));

    if (i + 1 < barVars.userStarRating[barType]) {
      getCurrentStarChild.classList.add("starFull-" + (i + 1));
    }
    if (i + 1 === Math.ceil(barVars.userStarRating[barType])) {
      if (barType === "Half" && barVars.boundRect.Half.isHalf) {
        getCurrentStarChild.classList.add("starHalf-" + (i + 1));
      } else if (barType !== "Percent") {
        getCurrentStarChild.classList.add("starFull-" + (i + 1));
      } else if (barType === "Percent") {
        let mousePos =
          Number(
            (
              barVars.userStarRating[barType] -
              Math.floor(barVars.userStarRating[barType])
            ).toFixed(2)
          ) * barVars.boundRect[barType].width;
        getCurrentStarChild.style.backgroundImage = `linear-gradient(90deg, var(--star-color-${
          i + 1
        }) ${mousePos}px, white ${mousePos}px`;
      }
    }
  });
}

function starMouseClick(e, barType) {
  let newPop = document.createElement("DIV");
  newPop.setAttribute("id", "popup1");
  document.getElementsByTagName("body")[0].append(newPop);
  newPop.innerText = "Thanks for rating!";
  newPop.classList.add("popup");
  setTimeout(() => {
    newPop.classList.add("popVisible");
    newPop.classList.add("popMoved");
  }, 10);
  setTimeout(() => {
    newPop.classList.remove("popVisible");
  }, 1010);
  setTimeout(() => {
    newPop.remove();
  }, 1510);

  getCurrentStarChild = document.getElementById(barVars.currentStarId[barType])
    .children[0];

  let currentStarIndex = barVars.starArray[barType].indexOf(
    barVars.currentStarId[barType]
  );

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
        getCurrentStarChild.classList.remove(
          "starFull-" + (currentStarIndex + 1)
        );
        getCurrentStarChild.classList.add("starHalf-" + (currentStarIndex + 1));
      } else {
        barVars.boundRect.Half.isHalf = false;
        barVars.userStarRating[barType] = 1;
        getCurrentStarChild.classList.remove(
          "starHalf-" + (currentStarIndex + 1)
        );
        getCurrentStarChild.classList.add("starFull-" + (currentStarIndex + 1));
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
