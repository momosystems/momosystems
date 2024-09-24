console.log("JavaScript erfolgreich geladen! shop.js");

// Beginning of the Code
// We, Momo Systems own the rights to this code, so it is forbidden to copy the code or claim ownership of it. Legal action will be taken in case of non-compliance. 

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

var MainImg = document.getElementById('MainImg');
var smallimg = document.getElementsByClassName('small-img');

smallimg[0].onclick = function () {
    MainImg.src = smallimg[0].src;
}

smallimg[1].onclick = function () {
    MainImg.src = smallimg[1].src;
}

smallimg[2].onclick = function () {
    MainImg.src = smallimg[2].src;
}

smallimg[3].onclick = function () {
    MainImg.src = smallimg[3].src;
}

//End of the Code