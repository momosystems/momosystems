console.log("JavaScript erfolgreich geladen! indexsudokusolve.js");

import { resetArray } from "./arraymethods.js";
import { addBlocks, addCells, focusFirstCell } from "./sudokusolvercells.js";
import { enableControls } from "./sudokusolvercontrols.js";

$(() => {
    resetArray();
    addBlocks();
    addCells();
    focusFirstCell();
    enableControls();
});