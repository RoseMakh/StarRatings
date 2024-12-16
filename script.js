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
    if (i <= currentStarIndex) {
      document.getElementById(s).classList.add("starYellow");
    } else if (i > currentStarIndex) {
      document.getElementById(s).classList.remove("starYellow");
    }
  });
}

function starMouseLeave(barType) {
  barVars.starArray[barType].map((s, i) => {
    if (i + 1 <= barVars.userStarRating[barType]) {
      document.getElementById(s).classList.add("starYellow");
    } else if (i + 1 > barVars.userStarRating[barType]) {
      document.getElementById(s).classList.remove("starYellow");
    }
  });
}

function starMouseClick(e, barType) {
  barVars.userStarRating[barType] =
    barVars.starArray[barType].indexOf(e.target.id) + 1;
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
