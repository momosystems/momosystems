console.log("JavaScript erfolgreich geladen! indexcal.js");

import { Calendar } from "./calendar.js";

$(() => {
    new Calendar().setup();
});