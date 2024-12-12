const cc = console.log;

const starBar = document.getElementById("starBar");

let currentStarId = "";
let userStarRating = 0;
let starArray = [];

//add stars to starBar
//later, turn this into function that accepts parent and number of stars so it dynamically makes star rating bars with different number of stars in it

for (i = 1; i <= 10; i++) {
  let newStar = document.createElement("DIV");
  newStar.classList.add("star");
  starBar.append(newStar);
  newStar.setAttribute("id", "star" + i);
  starArray.push(newStar.id);
  newStar.addEventListener("mouseenter", function (e) {
    starMouseEnter(e);
  });
  newStar.addEventListener("click", function (e) {
    starMouseClick(e);
  });
  // newStar.addEventListener("mouseleave", function (e) {
  //     starMouseLeave(e);
  //   });
}

starBar.addEventListener("mouseleave", function (e) {
  starMouseLeave(e);
});
//starBar.children[5].style.backgroundColor = "green";

function starMouseEnter(e) {
  let currentStarIndex = -1;
  //cc(e.target);
  // cc("testfunrunning");
  // cc(`target id: ${e.target.id}`);
  currentStarId = e.target.id;
  currentStarIndex = starArray.indexOf(currentStarId);
  // console.log("entered star ID:", currentStarId);
  // cc(`currentstarindex: ${currentStarIndex}`);

  starArray.map((s, i) => {
    // cc("starArray is being mapped");
    // cc(s);
    // cc(i);
    if (i <= currentStarIndex) {
      document.getElementById(s).classList.add("starYellow");
    } else if (i > currentStarIndex) {
      document.getElementById(s).classList.remove("starYellow");
    }
  });
}

function starMouseLeave(e) {
  // if (userStarRating === 0) {
  //   starArray.map((s) => {
  //     document.getElementById(s).classList.remove("starYellow");
  //   });
  // }

  starArray.map((s, i) => {
    // cc("starArray is being mapped");
    // cc(s);
    // cc(i);
    if (i + 1 <= userStarRating) {
      document.getElementById(s).classList.add("starYellow");
    } else if (i + 1 > userStarRating) {
      document.getElementById(s).classList.remove("starYellow");
    }
  });
}

function starMouseClick(e) {
  userStarRating = starArray.indexOf(e.target.id) + 1;
  cc("userstarrating:" + userStarRating);
}

//THE FOLLOWING FUNCTION JUST HOLDS CODE SNIPPETS FOR REFERENCE
function refref() {
  !getBtnFollow.contains(e.target) &&
    getBtnInstagram.classList.contains("animSlideReveal1");

  //more ref

  if (e.target !== this) {
    // Get the ID of the clicked child element
    const childId = e.target.id;
    console.log("Clicked child ID:", childId);
  }
}
