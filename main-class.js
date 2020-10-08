"use strict";

class Init {
  constructor(stepNum) {
    this.stepNum = stepNum;
    this.winArr = [];
    this.userArr = [];
    this.sameItems = 0;
    this.winnerRes = false;
  }
  compareArrays = (a, b) => {
    let i = a.length;
    if (i != b.length) return false;
    while (i--) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };
  checkCurrentItems = (a, b) => {
    let btn = document.querySelectorAll("button");

    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i] || a.includes(b[i])) {
        this.sameItems++;
      }
    }

    this.stepNum--;
    this.userArr = [];

    this.winnerRes = compareArrays(a, b);
    if (winnerRes) {
      alert("winneerrr");
      this.userArr = [];
    } else {
      if (this.sameItems > 0) {
        alert(`nice, you have a ${this.sameItems} matches, keep doing now...`);
        alert(`you have ${this.stepNum} left to try`);
      }
    }

    if (this.stepNum < 1) {
      alert("Sorry boi");
      for (let i = 0; i < btn.length; i++) btn[i].disabled = true;
      alert(`Win array is: ${this.winArr.toString()}`);
      let question = confirm("Do you want to reset a game?");
      if (question) {
        this.userArr = [];
        for (let i = 0; i < this.btn.length; i++) this.btn[i].disabled = false;
        this.stepNum = 0;
      }
    }
  };
  runGame = () => {
    let btn = document.querySelectorAll("button");
    console.log(this.btn);
    for (let i = 0; i <= btn.length; i++) {
      if (btn[i]) {
        btn[i].addEventListener("click", () => {
          this.userArr.push(parseInt(btn[i].value));
          if (this.userArr.length >= 4) {
            checkCurrentItems(this.winArr, this.userArr);
            let winnerRes = compareArrays(this.winArr, this.userArr);

            this.userArr = [];
            if (this.winnerRes) {
              alert("winneerrr");
              this.userArr = [];
            }
          }
        });
      }
    }
    console.log(this.winArr);
    if (this.winArr.length < 4) {
      const getRandomNumbers = () => {
        let res = Math.floor(Math.random() * Math.floor(4));
        this.winArr.push(res);
      };
      for (let i = 1; i <= 4; i++) getRandomNumbers();
      this.runGame();
    } else {
      alert("ooops");
    }
  };
}
document.addEventListener("DOMContentLoaded", () => {
  let app = new Init(3);
  app.runGame();
});
