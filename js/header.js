console.log("JavaScript erfolgreich geladen! header.js");

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', (e) => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', (e) => {
        nav.classList.remove('active');
    })
}

let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Please come back! :(";
})
window.addEventListener("focus", () => {
    document.title = docTitle;
})

