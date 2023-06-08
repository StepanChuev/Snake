'use strict';

class Snake {
	constructor(height, width, coordinates){
		this.coordinates = coordinates;
		this.height = height;
		this.width = width;
	}

	isCollide(){
		for (let i = 1; i < this.coordinates.length; i++){
			if (this.coordinates[0].x === this.coordinates[i].x && this.coordinates[0].y === this.coordinates[i].y){
				return true;
			}
		}

		return false;
	}

	addNodeInEnd(){
		return this.coordinates.push(deepCopy(this.coordinates.at(-1)));
	}

	moveSnakeToUp(){
		const copyCoordinates = deepCopy(this.coordinates);

		for (let i = 1; i < this.coordinates.length; i++){
			this.coordinates[i].y = copyCoordinates[i - 1].y;
			this.coordinates[i].x = copyCoordinates[i - 1].x;
		}

		this.coordinates[0].y--;

		if (this.coordinates[0].y < 0){
			this.coordinates[0].y = this.height - 1; // this.height + this.snake.snake[0].y
		}
	}

	moveSnakeToDown(){
		const copyCoordinates = deepCopy(this.coordinates);

		for (let i = this.coordinates.length - 1; i >= 1; i--){
			this.coordinates[i].y = copyCoordinates[i - 1].y;
			this.coordinates[i].x = copyCoordinates[i - 1].x;
		}

		this.coordinates[0].y++;

		if (this.coordinates[0].y > this.height - 1){
			this.coordinates[0].y = 0; // this.snake.snake[0].y - this.height
		}
	}

	moveSnakeToLeft(){
		const copyCoordinates = deepCopy(this.coordinates);

		for (let i = 1; i < this.coordinates.length; i++){
			this.coordinates[i].y = copyCoordinates[i - 1].y;
			this.coordinates[i].x = copyCoordinates[i - 1].x;
		}

		this.coordinates[0].x--;

		if (this.coordinates[0].x < 0){
			this.coordinates[0].x = this.width - 1; // this.width + this.snake.snake[0].x
		}
	}


	moveSnakeToRight(){
		const copyCoordinates = deepCopy(this.coordinates);

		for (let i = this.coordinates.length - 1; i >= 1; i--){
			this.coordinates[i].y = copyCoordinates[i - 1].y;
			this.coordinates[i].x = copyCoordinates[i - 1].x;
		}

		this.coordinates[0].x++;

		if (this.coordinates[0].x > this.width - 1){
			this.coordinates[0].x = 0; // this.snake.snake[0].x - this.width
		}
	}
};