'use strict';

class Field {
	constructor(width, height, snake){
		this.width = width;
		this.height = height;
		this.field = new Array(width);
		this.snake = snake;
		this.apple = {x: -1, y: -1};

		this.setup();
	}

	newApple(i = undefined, j = undefined){
		i = randomInt(0, this.width - 1);
		j = randomInt(0, this.height - 1);

		if (this.field[i][j] !== 0){
			return this.newApple();
		}

		this.field[i][j] = 2;

		return this.apple = {x: j, y: i};
	}

	isHeadOnApple(){
		return (this.snake.coordinates[0].x === this.apple.x && this.snake.coordinates[0].y === this.apple.y);
	}

	setup(){
		for (let i = 0; i < this.field.length; i++){
			this.field[i] = new Array(this.height);
		}

		this.update();
	}

	update(){
		for (let i = 0; i < this.field.length; i++){
			for (let j = 0; j < this.field[i].length; j++){
				this.field[i][j] = 0;
			}
		}

		for (let i = 0; i < this.snake.coordinates.length; i++){
			this.field[this.snake.coordinates[i].y][this.snake.coordinates[i].x] = 1;
		}
	}
};