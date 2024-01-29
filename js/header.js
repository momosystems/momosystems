console.log("Javascript erfolgreich geladen! Name: header");

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

const popup = document.querySelector(".popup-connectiom"),
wifiIcon = document.querySelector(".icon i-connection"),
popupTitle = document.querySelector(".popup .title-connection"),
popupDesc = document.querySelector(".desc-connection"),
reconnectBtn = document.querySelector(".reconnect-connection");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try {
        // Try to fetch random data from the API. If the status code is between 
        // 200 and 300, the network connection is considered online 
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isOnline = false; // If there is an error, the connection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status) { // If the status is true (online), update icon, title, and description accordingly
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Verbindung hergestellt";
        popupDesc.innerHTML = "Dein Gerät ist erfolgreich mit dem Internet vebunden.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    // If the status is false (offline), update the icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Verbindung verloren";
    popupDesc.innerHTML = "Dein Netzwerk ist nicht erreichbar. Wir wirden dich in <b>10</b> Sekunden neu verbinden.";
    popup.className = "popup show";

    intervalId = setInterval(() => { // Set an interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0) checkConnection(); // If the timer reaches 0, check the connection again
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}

// Only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);