"use strict";

const init = () => {
  let stepNum = 6;
  let winArr = [];
  let userArr = [];
  let rowIndex = 4;
  let startIndex = 0;
  let yellow = 0;
  let red = 0;
  const compareArrays = (a, b) => {
    let i = a.length;
    if (i != b.length) return false;
    while (i--) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };
  const clearGame = () => {
    let divH = document.getElementsByClassName("timer--white");
    let rowToShow = document.getElementsByClassName("box");
    let circleRow = document.getElementsByClassName("inner");
    for (let i = 0; i < rowToShow.length; i++) {
      rowToShow[i].innerHTML = "";
    }
    for (let i = 0; i < circleRow.length; i++) {
      circleRow[i].style.background = "black";
    }
    divH[0].style.height = "0" + "%";
  };
  const checkCurrentItems = (a, b) => {
    let rowToShow = document.getElementsByClassName("box");
    let index = -1;

    let btn = document.querySelectorAll("button");
    let sameItems = 0;

    for (let i = 0; i < a.length; i++) {
      if (a.includes(b[i])) {
        console.log(a.includes(b[i]));
        console.log("exact", a[i] === b[i]);
        sameItems++;
        yellow++;
        if (a[i] === b[i]) {
          red++;
          yellow--;
        }
      }
    }
    const stepDown = () => {
      for (let i = startIndex; i < rowIndex; i++) {
        index++;
        if (b[index] === 0) {
          rowToShow[i].innerHTML = "😁";
        } else if (b[index] === 1) {
          rowToShow[i].innerHTML = "♧";
        } else if (b[index] === 2) {
          rowToShow[i].innerHTML = "🍁";
        } else if (b[index] === 3) {
          rowToShow[i].innerHTML = "💜";
        } else if (b[index] === 4) {
          rowToShow[i].innerHTML = "🔶";
        } else if (b[index] === 5) {
          rowToShow[i].innerHTML = "⭐";
        }
      }
      let rowToShowInner = document.getElementsByClassName("inner");
      for (let i = startIndex; i < rowIndex; i++) {
        console.log("red", red);
        console.log("yellow", yellow);
        if (red > 0) {
          for (let i = startIndex; i <= startIndex + red - 1; i++) {
            rowToShowInner[i].style.background = "red";
          }
        }
        if (yellow > 0) {
          console.log("start index za yellow", startIndex + red);
          console.log("end index za yellow", startIndex + red + yellow + 1);
          for (
            let j = startIndex + red;
            j <= startIndex + red + yellow - 1;
            j++
          ) {
            console.log(yellow, ":yellow", "j:", j);
            rowToShowInner[j].style.background = "yellow";
          }
        }
      }
      startIndex += 4;
      rowIndex += 4;
      red = 0;
      yellow = 0;
    };
    stepNum--;
    userArr = [];

    let winnerRes = compareArrays(a, b);
    if (winnerRes) {
      alert("winneerrr");
      userArr = [];
    } else {
      if (sameItems > 0) {
        alert(`nice, you have a ${sameItems} matches, keep doing now...`);
        alert(`you have ${stepNum} left to try`);
        stepDown();
      } else {
        stepDown();
      }
    }

    if (stepNum < 1) {
      let divH = document.getElementsByClassName("timer--white");
      divH[0].style.height = "0" + "%";
      let rowToShowResult = document.querySelectorAll(".last > .box");

      let index = -1;

      for (let i = 0; i <= rowToShowResult.length; i++) {
        index++;
        if (winArr[index] === 0) {
          rowToShowResult[i].innerHTML = "😁";
        } else if (winArr[index] === 1) {
          rowToShowResult[i].innerHTML = "♧";
        } else if (winArr[index] === 2) {
          rowToShowResult[i].innerHTML = "🍁";
        } else if (winArr[index] === 3) {
          rowToShowResult[i].innerHTML = "💜";
        } else if (winArr[index] === 4) {
          rowToShowResult[i].innerHTML = "🔶";
        } else if (winArr[index] === 5) {
          rowToShowResult[i].innerHTML = "⭐";
        }
      }
      alert("Sorry boi, time is gone");
      let question = confirm("Do you want to reset a game?");
      if (question) {
        userArr = [];
        for (let i = 0; i < btn.length; i++) btn[i].disabled = false;
        stepNum = 0;
        runGame();
        clearGame();
        divH[0].style.height = "0" + "%";
      } else {
        divH[0].style.height = "0" + "%";
      }
    }
  };

  const runGame = () => {
    let divH = document.getElementsByClassName("timer--white");
    let timerHeight = 1;
    let timer = setInterval(() => {
      timerHeight += 2;
      divH[0].style.height = timerHeight + "%";
      if (timerHeight > 100) {
        clearInterval(timer);
        let rowToShowResult = document.querySelectorAll(".last > .box");

        let index = 0;
        for (let i = 0; i <= rowToShowResult.length; i++) {
          index++;
          if (winArr[index] === 0) {
            rowToShowResult[i].innerHTML = "😁";
          } else if (winArr[index] === 1) {
            rowToShowResult[i].innerHTML = "♧";
          } else if (winArr[index] === 2) {
            rowToShowResult[i].innerHTML = "🍁";
          } else if (winArr[index] === 3) {
            rowToShowResult[i].innerHTML = "💜";
          } else if (winArr[index] === 4) {
            rowToShowResult[i].innerHTML = "🔶";
          } else if (winArr[index] === 5) {
            rowToShowResult[i].innerHTML = "⭐";
          }
        }
        alert("Sorry boi, time is gone");

        let question = confirm("Do you want to reset a game?");
        if (question) {
          userArr = [];
          for (let i = 0; i < btn.length; i++) btn[i].disabled = false;
          stepNum = 0;
          runGame();
          clearGame();
        } else {
          clearGame();
        }
      }
    }, 1000);

    let btn = document.querySelectorAll("button");
    for (let i = 0; i <= btn.length; i++) {
      if (btn[i]) {
        btn[i].addEventListener("click", () => {
          userArr.push(parseInt(btn[i].value));
          if (userArr.length >= 4) {
            checkCurrentItems(winArr, userArr);
            let winnerRes = compareArrays(winArr, userArr);

            userArr = [];
            if (winnerRes) {
              alert("winneerrr");
              userArr = [];
            }
          }
        });
      }
    }
  };

  if (winArr.length < 4) {
    const getRandomNumbers = () => {
      let res = Math.floor(Math.random() * Math.floor(5));
      winArr.push(res);
    };
    for (let i = 1; i <= 4; i++) getRandomNumbers();
    runGame();
    console.log(winArr);
  } else {
    alert("ooops");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
