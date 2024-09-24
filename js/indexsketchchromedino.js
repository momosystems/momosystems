console.log("JavaScript erfolgreich geladen! indexsketchchromedino.js");

let ground;
let groundImg;
let dinoRun1Img;
let dinoRun2Img;
let dinoDuck1Img;
let dinoDuck2Img;

let largeTripleCactusImg;
let largeDoubleCactusImg;
let largeSingleCactusImg;
let smallTripleCactusImg;
let smallDoubleCactusImg;
let smallSingleCactusImg;

let font;

// obstacle stuff
let allObstacleImgs = [];
let obstacleSpawnTimer = 50;
let allObstacles = [];
let obstacleCount = 0;

// game logic and visual stuff
let updateLogicSpeed = 1;
let gameSpeed = 10;
let speedIncrement = 0.5;
let score = 0;
let lastScoreMilestone = 0;
let visualizationMode = false; // visualize hitboxes

// ai stuff
let generation = 1;
let population = [];
let populationSize = 500;
let alive = populationSize;
let nextConnectionNumber = 1000;
let networkVisualizer;
let displayNetwork = true; // display neural network
let visualizeClosestObstacle = false;

function preload() {
	groundImg = loadImage("../img/ground.png");
	dinoRun1Img = loadImage("../img/dinorun1.png");
	dinoRun2Img = loadImage("../img/dinorun2.png");
	dinoDuck1Img = loadImage("../img/dinoduck1.png");
	dinoDuck2Img = loadImage("../img/dinoduck2.png");

	largeTripleCactusImg = loadImage("../img/cactuslargetriple.png");
	largeDoubleCactusImg = loadImage("../img/cactuslargedouble.png");
	largeSingleCactusImg = loadImage("../img/cactuslargesingle.png");
	smallTripleCactusImg = loadImage("../img/cactussmalltriple.png");
	smallDoubleCactusImg = loadImage("../img/cactussmalldouble.png");
	smallSingleCactusImg = loadImage("../img/cactussmallsingle.png");

	birdImg1 = loadImage("../img/bird1.png");
	birdImg2 = loadImage("../img/bird2.png");

	font = loadFont("../fonts/PublicPixel.ttf");
}

function setup() {
	createCanvas(2400, 1280);
	frameRate(60);

	allCactiImgs = [
		largeTripleCactusImg,
		largeDoubleCactusImg,
		largeSingleCactusImg,
		smallTripleCactusImg,
		smallDoubleCactusImg,
		smallSingleCactusImg,
	];

	ground = new Ground();
	population = new Population(populationSize);
	networkVisualizer = new NetworkVisualizer(
		population.population[0].brain,
		width / 6,
		height / 16,
		1500,
		500
	);
}

function draw() {
	// ---- logic ----

	for (let i = 0; i < updateLogicSpeed; i++) {
		score += gameSpeed / 60;
		if (floor(score) - lastScoreMilestone >= 100) {
			lastScoreMilestone = floor(score);
			gameSpeed += speedIncrement;
		}

		// spawn new obstacle
		if (obstacleSpawnTimer >= 110 - gameSpeed) {
			// for the first 3 obstacles, have a higher chance of spawning a bird so dinos can learn birds better
			if (obstacleCount < 3) {
				if (random(1) < 0.6) {
					allObstacles.push(new Cactus());
				} else {
					allObstacles.push(new Bird());
				}
			} else {
				if (random(1) < 0.85) {
					allObstacles.push(new Cactus());
				} else {
					allObstacles.push(new Bird());
				}
			}

			obstacleCount++;
			obstacleSpawnTimer = getRandomInterval();
		}
		obstacleSpawnTimer++;

		// update all obstacle logic
		for (let i = 0; i < allObstacles.length; i++) {
			allObstacles[i].update();

			for (let j = 0; j < population.population.length; j++) {
				let player = population.population[j];
				if (player.isAlive === false) continue;

				if (allObstacles[i].isBird) {
					if (allObstacles[i].collidedWithPlayer(player, true)) {
						player.isAlive = false;
						player.score = score;
						alive--;
					}
				} else {
					if (allObstacles[i].collidedWithPlayer(player, false)) {
						player.isAlive = false;
						player.score = score;
						alive--;
					}
				}

				if (allObstacles[i].playerPassed(player)) {
					if (!player.obstaclesPassed.has(allObstacles[i].id)) {
						if (player.isDucking && allObstacles[i].isBird) {
							player.birdsPassedWhileDucking++;
						} else if (!player.isDucking && allObstacles[i].isBird) {
							player.birdsPassedWhileJumping++;
						}
						player.obstaclesPassed.add(allObstacles[i].id);
					}
				}

				allObstacles[i].playerPassedForAI(player);
			}

			if (allObstacles[i].offScreen()) {
				allObstacles.splice(i, 1);
				i--;
			}
		}

		ground.update();

		if (population.allDead() === false) {
			population.updatePlayers();
		} else {
			// if all dinos die, then start next generation
			generation++;
			allObstacles = [];
			obstacleCount = 0;
			obstacleSpawnTimer = 50;
			gameSpeed = 10;
			score = 0;
			lastScoreMilestone = 0;
			alive = populationSize;
			population.naturalSelection();
		}
	}

	// ---- visuals ----

	background(247);

	// displays the neural network of the best player of the prev generation
	if (displayNetwork) {
		networkVisualizer.show(population.bestPlayer);
	}

	ground.show();

	// show all obstacles
	for (let i = 0; i < allObstacles.length; i++) {
		allObstacles[i].show();
	}

	// display all the players
	if (population.allDead() === false) {
		population.showPlayers();
	}

	if (visualizeClosestObstacle) {
		for (let i = 0; i < population.population.length; i++) {
			if (population.population[i].isAlive) {
				population.population[i].visualizeClosestObstacle();
			}
		}
	}

	// show hitboxes on player and obstacles
	if (visualizationMode) {
		visualizeHitBoxes();
	}

	// all text stuff
	textFont(font);
	fill(53);
	noStroke();
	textSize(40);
	textAlign(LEFT);
	let paddedScore = padScore(floor(score));
	let scoreText = "Punkte: " + paddedScore;
	let generationText = "Gen: ";
	let aliveText = "Lebend:  ";
	let scoreWidth = textWidth(scoreText);
	text(scoreText, width - scoreWidth - 100, 100);
	text(generationText, width - 500, 175);
	text(generation, width - 300, 175);
	text(aliveText, width - 580, 250);
	text(alive, width - 300, 250);
}

// add 0's to the score display
function padScore(score) {
	let scoreStr = score.toString();
	while (scoreStr.length < 5) {
		scoreStr = "0" + scoreStr;
	}
	return scoreStr;
}

// add some randomness to the cactus spawns by changing the interval every time
function getRandomInterval() {
	return int(random(-30, 30));
}

function visualizeHitBoxes() {
	// visualize dino hitbox
	stroke(255, 0, 0);
	noFill();
	for (let i = 0; i < population.population.length; i++) {
		let dino = population.population[i];

		if (!dino.isAlive) continue;

		if (dino.isDucking) {
			rect(dino.x + 30, dino.y + 60, dino.width - 60, dino.height - 60);
		} else {
			rect(dino.x + 30, dino.y + 30, dino.width - 60, dino.height - 60);
		}
	}

	// visualize obstacles
	for (let i = 0; i < allObstacles.length; i++) {
		let obstacle = allObstacles[i];

		rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	}
}

function keyPressed() {
	if (key === "v") {
		visualizationMode = !visualizationMode;
	}
	if (key === "n") {
		displayNetwork = !displayNetwork;
	}
	if (key === "b") {
		visualizeClosestObstacle = !visualizeClosestObstacle;
	}
	if (key === "1") {
		updateLogicSpeed = 1;
	}
	if (key === "2") {
		updateLogicSpeed = 2;
	}
	if (key === "3") {
		updateLogicSpeed = 5;
	}
	if (key === "4") {
		updateLogicSpeed = 10;
	}
	if (key === "5") {
		updateLogicSpeed = 30;
	}
}
