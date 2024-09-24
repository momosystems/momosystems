console.log("JavaScript erfolgreich geladen! indexwscramble.js");

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
let correctWord, timer;
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Die Zeit ist um! ${correctWord.toUpperCase()} war das richtige Wort`);
        initGame();
    }, 1000);
}
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Bitte gib ein Wort ein!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} ist nicht das richtige Wort!`);
    alert(`Glückwunsch! ${correctWord.toUpperCase()} ist das richtige Wort!`);
    initGame();
}
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);