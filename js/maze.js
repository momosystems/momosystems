console.log("JavaScript erfolgreich geladen! maze.js");

import { Cell } from "./labyrinthcell.js";
import { randEl } from "./labyrinthhelper.js";
import { sizeInput, startBtn } from "./labyrinthmenu.js";

const canvas = document.getElementById("canvas");
canvas.width = canvas.height;
const ctx = canvas.getContext("2d");

export class Maze {
    constructor() {
        this.cells = [];
        this.size = 20;
        this.delay = 20;
        this.creating = false;
        this.init();
    }

    init() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this.cells.push(
                    new Cell({ x, y }, canvas.width / this.size)
                );
            }
        }
    }

    reset() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cells = [];
        this.init();
    }

    getCell(i, j) {
        return this.cells[i * this.size + j];
    }

    draw(ctx) {
        this.cells.forEach((cell) => cell.draw(ctx));
    }

    getUnvisitedNeighbors(cell) {
        const neighbors = [];
        const addNeighbor = (u, v) => {
            if (u >= 0 && u < this.size && v >= 0 && v < this.size) {
                const c = this.getCell(u, v);
                if (!c.visited) neighbors.push(c);
            }
        };
        const { x, y } = cell.pos;
        addNeighbor(x - 1, y);
        addNeighbor(x + 1, y);
        addNeighbor(x, y + 1);
        addNeighbor(x, y - 1);
        return neighbors;
    }

    create() {
        if (this.creating) return;

        this.creating = true;
        sizeInput.disabled = true;
        startBtn.disabled = true;
        this.draw(ctx);

        const stack = [];

        const visitCell = (currentCell) => {
            currentCell.visited = true;
            currentCell.draw(ctx, "red");

            if (this.cells.some((cell) => !cell.visited)) {
                const neighbors =
                    this.getUnvisitedNeighbors(currentCell);
                let nextCell;

                if (neighbors.length == 0 && stack.length > 0) {
                    nextCell = stack.pop();
                } else {
                    nextCell = randEl(neighbors);
                    currentCell.removeLineBetween(nextCell);
                    stack.push(currentCell);
                }

                setTimeout(() => {
                    currentCell.draw(ctx);
                    visitCell(nextCell);
                }, this.delay);
            } else {
                currentCell.draw(ctx);
                this.creating = false;
                sizeInput.disabled = false;
                startBtn.disabled = false;
            }
        };

        visitCell(randEl(this.cells));
    }
}