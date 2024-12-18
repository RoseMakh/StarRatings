const cc = console.log;

//variables not related to users

let barTypesAll = ["Full", "Half"];

//variables for individual starBars, allows for accessing them dynamically
let barVars = {
  getStarBar: {
    Full: document.getElementById("starBarFull"),
    Half: document.getElementById("starBarHalf"),
  },
  getStarRatingText: {
    Full: document.getElementById("starRatingTextFull"),
    Half: document.getElementById("starRatingTextHalf"),
  },
  //from mouseenter
  currentStarId: {
    Full: "",
    Half: "",
  },
  userStarRating: {
    Full: 0,
    Half: 0,
  },
  starArray: {
    Full: [],
    Half: [],
  },
  // mouseX: {
  //   Half: 0,
  // },
  boundRect: {
    Half: {
      //true = is half, false = is full, null = not set yet
      isHalf: null,
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
createStarsSingleUser("Full");
createStarsSingleUser("Half");

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
    if (i < currentStarIndex) {
      document.getElementById(s).classList.remove("starYellowHalf");
      document.getElementById(s).classList.add("starYellow");
    } else if (i > currentStarIndex) {
      document.getElementById(s).classList.remove("starYellow");
      document.getElementById(s).classList.remove("starYellowHalf");
    }
  });

  if (barType === "Full") {
    document
      .getElementById(barVars.currentStarId[barType])
      .classList.add("starYellow");
  } else if (barType === "Half") {
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
  }
}

function starMousemove(e, barType) {
  cc(e.clientX - barVars.boundRect[barType].left);
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
}

function starMouseLeave(barType) {
  barVars.starArray[barType].map((s, i) => {
    if (i + 1 < barVars.userStarRating[barType]) {
      document.getElementById(s).classList.remove("starYellowHalf");
      document.getElementById(s).classList.add("starYellow");
    } else if (i + 1 >= barVars.userStarRating[barType]) {
      document.getElementById(s).classList.remove("starYellow");
      document.getElementById(s).classList.remove("starYellowHalf");
    }
    if (i + 1 === Math.ceil(barVars.userStarRating[barType])) {
      document.getElementById(s).classList.remove("starYellowHalf");
      document.getElementById(s).classList.remove("starYellow");

      switch (barVars.boundRect.Half.isHalf) {
        case true:
          document.getElementById(s).classList.add("starYellowHalf");
          break;
        case false:
          document.getElementById(s).classList.add("starYellow");
          break;
      }
    }

    // if (i + 1 == barVars.userStarRating[barType]) {
    //   if (barType === "Full") {
    //     document.getElementById(s).classList.add("starYellow");
    //   } else if (barType === "Half") {
    //     barVars.boundRect.Half.isHalf
    //       ? document.getElementById(s).classList.add("starYellowHalf")
    //       : document.getElementById(s).classList.add("starYellow");
    //   }
    // }
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
  }

  barVars.userStarRating[barType] += barVars.starArray[barType].indexOf(
    e.target.id
  );

  barVars.getStarRatingText[barType].innerText =
    barVars.userStarRating[barType];
  cc([barType] + " UserStarRating:" + barVars.userStarRating[barType]);
}

//THE FOLLOWING FUNCTION JUST HOLDS CODE SNIPPETS FOR REFERENCE
function refref() {
  !getBtnFollow.contains(e.target) &&
    getBtnInstagram.classList.contains("animSlideReveal1");

  if (e.target !== this) {
    // Get the ID of the clicked child element
    const childId = e.target.id;
    console.log("Clicked child ID:", childId);
  }

  getStarBarFull.children[5].style.backgroundColor = "green";
}
