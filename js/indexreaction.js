console.log("JavaScript erfolgreich geladen! indexreaction.js");

const STATES = {
    INTRO: 0,
    GAME: 1,
    EVALUATION: 2,
};

const numberRounds = 10;
const minimalRandomTime = 2000;
const maximalRandomTime = 10000;

let currentState = STATES.INTRO;
let startTime = null;
let counter = 0;
let counting = false;
let timeList = [];
let currentRound = 0;

$(window).keydown((e) => {
    if (e.code != "Space") return;
    if (currentState == STATES.INTRO || currentState == STATES.EVALUATION) {
        currentState = STATES.GAME;
        startGame();
    } else if (currentState == STATES.GAME) {
        if (counting) {
            counting = false;
            setTimeout(() => {
                resetCounter();
                showNextNumber();
            }, 2000);
        } else {
            location.reload();
        }
    }
});

function startGame() {
    $("#intro, #evaluation").hide();
    $("#game").fadeIn();
    currentRound = 0;
    timeList = [];
    $("#average, #times").text("");
    showNextNumber();
}

function resetCounter() {
    counting = false;
    counter = 0;
    $("#number").fadeOut(100);
    $("#plus").fadeIn(100);
}

function showNextNumber() {
    currentRound++;
    if (currentRound > numberRounds) {
        showEvaluation();
    } else {
        const randomTime = randomInt(minimalRandomTime, maximalRandomTime);
        setTimeout (() => {
            startCounter();
        }, randomTime);
    }
}

function showEvaluation() {
    $("#intro, #game").hide();
    $("#evaluation").fadeIn("slow");
    currentState = STATES.EVALUATION;
    $("#times").text(timeList.join(", "));
    $("#average").text(Math.round(average(timeList)));
}

function startCounter() {
    $("#number").text("0").show();
    $("#plus").hide();
    startTime = new Date().getTime();
    counting = true;
    count();
}

function count() {
    counter = new Date().getTime() - startTime;
    $("#number").text(counter);
    if (counting) {
        requestAnimationFrame(count);
    } else {
        timeList.push(counter);
    }
}

function randomInt(a, b) {
    return a + Math.floor((b-a)*Math.random());
}

function average(arr) {
    if (arr.length == 0) return 0;
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
        s += arr[i];
    }
    return s / arr.length;
}