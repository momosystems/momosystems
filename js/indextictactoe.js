const SPIELFELD_KLASSE = "spielfeld";
const SPIELANZEIGE_KLASSE = "spielanzeige";
const FELD_KLASSE = "feld";
const SPIELER_KLASSE = "spieler";
const GEGNER_KLASSE = "gegner";
const OVERLAY_KLASSE = "overlay";
const OVERLAY_TEXT_KLASSE = "overlay-text";
const OVERLAY_BUTTON_KLASSE = "overlay-button";
const SICHTBAR_KLASSE = "sichtbar";

const spielfeld = document.querySelector("." + SPIELFELD_KLASSE);
const spielanzeige = document.querySelector("." + SPIELANZEIGE_KLASSE);
const overlay = document.querySelector("." + OVERLAY_KLASSE);
const overlayText = document.querySelector("." + OVERLAY_TEXT_KLASSE);
const overlayButton = document.querySelector("." + OVERLAY_BUTTON_KLASSE);

const felder = document.querySelectorAll("." + FELD_KLASSE);

const SIEG_KOMBINATION = [
    [felder[0], felder[1], felder[2]],
    [felder[3], felder[4], felder[5]],
    [felder[6], felder[7], felder[8]],
    [felder[0], felder[3], felder[6]],
    [felder[1], felder[4], felder[7]],
    [felder[2], felder[5], felder[8]],
    [felder[0], felder[4], felder[8]],
    [felder[2], felder[4], felder[6]]
];

let aktuelleKlasse;

overlayButton.addEventListener("click", spielStarten);

spielStarten();

function klickVerarbeiten(ereignis) {
    const feld = ereignis.target;

    if (spielsteinSetzen(feld) === true) {
        zugBeenden();
    }

}

function spielsteinSetzen(feld) {
    if (feld.classList.contains(SPIELER_KLASSE) || feld.classList.contains(GEGNER_KLASSE)) {
        return false;
    }
    feld.classList.add(aktuelleKlasse);

    feld.disabled = true;

    return true;
}

function spielStarten() {
    overlay.classList.remove(SICHTBAR_KLASSE);

    overlayText.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);

    aktuelleKlasse = null;

    for (const feld of felder) {
        feld.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);

        feld.disabled = false;

        feld.addEventListener("click", klickVerarbeiten);
    }
    zugBeenden();
}

function zugBeenden() {
    if (siegPruefen(aktuelleKlasse) === true) {
        spielBeenden(false);
        return;
    }

    if (unentschiedenPruefen() === true) {
        spielBeenden(true);
        return;
    }

    if (aktuelleKlasse === SPIELER_KLASSE) {
        aktuelleKlasse = GEGNER_KLASSE;
    } else if (aktuelleKlasse === GEGNER_KLASSE) {
        aktuelleKlasse = SPIELER_KLASSE;
    } else {
        aktuelleKlasse = Math.random() < 0.5 ? SPIELER_KLASSE : GEGNER_KLASSE;
    }
    spielanzeigeAktualisieren();

    if (aktuelleKlasse === GEGNER_KLASSE) {
        setTimeout(computerZugAusfuehren, 750);
    }
}

function spielanzeigeAktualisieren() {
    spielanzeige.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);
    if (aktuelleKlasse === SPIELER_KLASSE) {
        spielanzeige.innerText = "Du bist am Zug.";
    } else {
        spielanzeige.innerText = "Der Gegner ist am Zug."
    }
    spielanzeige.classList.add(aktuelleKlasse);
}

function siegPruefen(siegerKlasse) {
    for (const kombination of SIEG_KOMBINATION) {
        const gewonnen = kombination.every(function(feld) {
            return feld.classList.contains(siegerKlasse);
        });
        if (gewonnen === true) {
            return true;
        }
    }
    return false;
}

function spielBeenden(unentschieden) {
    // Text für das Overlay festlegen
    if (unentschieden === true) {
        overlayText.innerText = "Unentschieden!";
    } else if (aktuelleKlasse === SPIELER_KLASSE) {
        overlayText.innerText = "Du hast gewonnen!";
        overlayText.classList.add(SPIELER_KLASSE);
    } else {
        overlayText.innerText = "Der Gegner hat gewonnen!";
        overlayText.classList.add(GEGNER_KLASSE);
    }

    // Das Overlay sichtbar machen
    overlay.classList.add(SICHTBAR_KLASSE);
}

function unentschiedenPruefen() {
    for (const feld of felder) {
        if (!feld.classList.contains(SPIELER_KLASSE) &&
            !feld.classList.contains(GEGNER_KLASSE)
        ) {
            return false;
        }
    }
    return true;
}

function computerZugAusfuehren() {
    if (spielsteinSetzen(bestenZugFinden ()) === true) {
        zugBeenden();
    } else {
        computerZugAusfuehren();
    }
}

function bestenZugFinden() {

    let besteWertung;
    let besterZug;

    for (const feld of felder) {
        if (feld.classList.contains(SPIELER_KLASSE) || feld.classList.contains(GEGNER_KLASSE)) {
            continue;
        }
        feld.classList.add(aktuelleKlasse);

        const zugWertung = zugBewerten(true);

        if  (besteWertung === undefined || zugWertung > besteWertung) {
            besteWertung = zugWertung;
            besterZug = feld;
        }

        feld.classList.remove(aktuelleKlasse);
    }

    return besterZug
}

function zugBewerten(istEigenerZug) {
    if(siegPruefen(aktuelleKlasse)) {
        return 10;
    } 
    if (siegPruefen(aktuelleKlasse === SPIELER_KLASSE ? GEGNER_KLASSE : SPIELER_KLASSE)) {
        return -10;
    }
    if(unentschiedenPruefen()) {
        return 0;
    }
    
    if(istEigenerZug === true) {

    let kleinsteWertung;

    for (const feld of felder) {
        if(feld.classList.contains(SPIELER_KLASSE) || feld.classList.contains(GEGNER_KLASSE)) {
            continue;
        }
        feld.classList.add(aktuelleKlasse === SPIELER_KLASSE ? GEGNER_KLASSE : SPIELER_KLASSE);

        const zugWertung = zugBewerten(false);

        if (kleinsteWertung === undefined || zugWertung < kleinsteWertung) {
            kleinsteWertung = zugWertung;
        }
        feld.classList.remove(SPIELER_KLASSE, GEGNER_KLASSE);
    }
    return kleinsteWertung;
    } else {
        let besteWertung;
        for (const feld of felder) {
            if (feld.classList.contains(SPIELER_KLASSE) || feld.classList.contains(GEGNER_KLASSE)) {
                continue;
            }
        feld.classList.add(aktuelleKlasse);

        const zugWertung = zugBewerten(true);
        
        if (besteWertung === undefined || zugWertung > besteWertung) {
            besteWertung = zugWertung;
        }
            
        feld.classList.remove(aktuelleKlasse); 
        }

        return besteWertung;
    }
}