console.log("JavaScript erfolgreich geladen! indexkeycode.js");

const box = document.querySelector(".box");
document.addEventListener("keydown", e => {
    if (e.keyCode == 32) {
        box.querySelector(".key-code").innerText = e.keyCode;
        box.querySelector(".key-name").innerText = "Space";
        box.querySelector(".key span").innerText = "Space";
        box.querySelector(".code span").innerText = e.keyCode;
    } else {
        box.querySelector(".key-code").innerText = e.keyCode;
        box.querySelector(".key-name").innerText = e.key;
        box.querySelector(".key span").innerText = e.key;
        box.querySelector(".code span").innerText = e.keyCode;
    }
    box.classList.add("active");
});