let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow", "red", "green", "purple"];

// START GAME
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelup();
    }
});

// FLASH EFFECT
function btnflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// LEVEL UP
function levelup() {
    userseq = [];

    level++;
    h2.innerText = `Level ${level} | High Score: ${highscore}`;

    let randidx = Math.floor(Math.random() * 4);
    let randomcolor = btns[randidx];

    gameseq.push(randomcolor);

    let btn = document.querySelector(`.${randomcolor}`);
    btnflash(btn);
}

// CHECK ANSWER
function checkans(idx) {

    if (userseq[idx] === gameseq[idx]) {

        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }

    } else {
        // 🔥 UPDATE HIGH SCORE
        if (level > highscore) {
            highscore = level;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High Score: ${highscore} <br> Press any key to restart`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// BUTTON PRESS
function btnpress() {
    let btn = this;

    btnflash(btn);

    let usercolor = btn.classList[1];
    userseq.push(usercolor);

    checkans(userseq.length - 1);
}

// ADD EVENT LISTENER TO BUTTONS
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// RESET GAME
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}