console.log("JavaScript erfolgreich geladen! labyrinthmenu.js");

export const delayInput = document.getElementById("delayInput");
export const sizeInput = document.getElementById("sizeInput");
export const startBtn = document.getElementById("startBtn");

export function enableMenu(maze) {
    delayInput.value = maze.delay;
    sizeInput.value = maze.size;

    delayInput.onchange = () => {
        maze.delay = parseInt(delayInput.value);
    };

    sizeInput.onchange = () => {
        if (maze.creating) return;
        maze.size = parseInt(sizeInput.value);
        maze.reset();
    };

    startBtn.onclick = () => {
        if (maze.creating) return;
        maze.reset();
        maze.create();
    };
}