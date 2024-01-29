console.log("Javascript erfolgreich geladen! Name: indexlabyrinthgen");

import { Maze } from "./maze.js";
import { enableMenu } from "./labyrinthmenu.js";

enableMenu(new Maze());