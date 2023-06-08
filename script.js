'use strict';

const main = async () => {
	const localStorage = window.localStorage;

	const canvas = document.querySelector('.canvas');
	const context = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.strokeStyle = "#000";
	context.fillStyle = "#0f0";
	context.font = "100px serif";
	context.textAlign = "center";

	const cellSize = 20;
	const amountCellsX = Math.floor(canvas.height / cellSize);
	const amountCellsY = Math.floor(canvas.width / cellSize);
	let direction = "right";
	let isGameOver = false;

	const snake = new Snake(amountCellsX, amountCellsY, [
			{x: 3, y: 1},
			{x: 3, y: 2},
			{x: 2, y: 2},
			{x: 1, y: 2},
	]);

	let score = snake.coordinates.length;

	const field = new Field(amountCellsX, amountCellsY, snake);
	field.newApple();

	animation({
		async render(){
			context.clearRect(0, 0, canvas.width, canvas.height);

			if (isGameOver){
				context.fillStyle = "#f00";
				context.font = "80px serif";
				context.fillText("Game Over\n", canvas.width / 2, canvas.height / 2);
				context.fillText("Your score: " + score, canvas.width / 2, canvas.height / 2 + 80);
				context.fillText("Record: " + localStorage.getItem("maxScore"), canvas.width / 2, canvas.height / 2 + 160);
				return;
			}

			context.fillStyle = "#0f0";
			drawSnake(context, snake, cellSize);
			context.fillStyle = "#f00";
			drawApple(context, field.apple, cellSize);

			context.fillStyle = "#4c514a";
			context.font = "40px serif";
			context.fillText("Score: " + score.toString(), canvas.width - 100, 40);
		},

		async update(){
			await delay(100);
			field.update();

			if (snake.isCollide()){
				localStorage.setItem("maxScore", Math.max(localStorage.getItem("maxScore") || 0, score))
				isGameOver = true;
				console.log("Game Over");
			}

			if (field.isHeadOnApple()){
				snake.addNodeInEnd();
				field.newApple();
				score++;
			}

			if (direction === "left"){
				snake.moveSnakeToLeft();
			}

			else if (direction === "up"){
				snake.moveSnakeToUp();
			}

			else if (direction === "right"){
				snake.moveSnakeToRight();
			}

			else if (direction === "down"){
				snake.moveSnakeToDown();
			}
		}
	});	

	window.addEventListener("keydown", (event) => {
		if (event.keyCode === 37 && direction !== "right"){
			direction = "left";
		}

		else if (event.keyCode === 38 && direction !== "down"){
			direction = "up";
		}

		else if (event.keyCode === 39 && direction !== "left"){
			direction = "right";
		}

		else if (event.keyCode === 40 && direction !== "up"){
			direction = "down";
		}

		// console.log(event);
		// console.log(snake);
	});
};

main();