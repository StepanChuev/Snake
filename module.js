'use strict';

const deepCopy = (obj) => {
	const copy = (Array.isArray(obj)) ? [] : {};

	for (const key in obj){
		if (typeof obj[key] === "object"){
			copy[key] = deepCopy(obj[key]);
		}

		else {
			copy[key] = obj[key];
		}
	}

	return copy;
};

const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (ms) => new Promise(resolve => {
	setTimeout(resolve, ms);
});

const animation = ({render = () => {}, update = () => {}}) => {

	const tick = async (timestamp) => {
		await render(timestamp);
		await update(timestamp);
		requestAnimationFrame(tick);
	};
	
	requestAnimationFrame(tick);
};

const drawSnake = (context, snake, cellSize) => {
	for (let i = 0; i < snake.coordinates.length; i++){
		context.beginPath();
		context.fillRect(snake.coordinates[i].x * cellSize, snake.coordinates[i].y * cellSize, cellSize, cellSize);
	}
};

const drawApple = (context, apple, cellSize) => {
	context.beginPath();
	context.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
};