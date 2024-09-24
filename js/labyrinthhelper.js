console.log("JavaScript erfolgreich geladen! labyrinthhelper.js");

function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}

export function randEl(list) {
    const index = randInt(0, list.length);
    return list[index];
}