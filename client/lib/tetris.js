class Tetris {
    constructor(element) {
        this.element = element;
        this.canvas = element.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.scale(20, 20);

        this.arena = new Arena(12, 20);        
        this.player = new Player(this);
        
        this.player.events.listen('score', score => this.updateScore(score));

        this.colors = [
            null,
            '#fac',
            '#caf',
            '#ccf',
            '#ced',
            '#cfe',
            '#cec',
            '#fcd'
        ];
        let lastTime = 0;
        this._update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;        
            this.player.update(deltaTime);        
            this.draw();
            requestAnimationFrame(this._update);
        };
    }

    draw() {
        this.clearStage();
        this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    clearStage() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    serialize() {
        return {
            arena: {
                matrix: this.arena.matrix
            },

            player: {
                matrix: this.player.matrix,
                pos: this.player.pos,
                score: this.player.score
            }
        };
    }

    unserialize(state) {
        this.arena = Object.assign(state.arena);
        this.player = Object.assign(state.player);
        this.updateScore(this.player.score);
        this.draw();
    }

    run() {
        this._update();
    }

    updateScore(score) {
        this.element.querySelector('.score').innerText = score;
    }

    createPiece(type) {
        if (type === 'T') {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ];
        } else if (type === 'L') {
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2]
            ];
        } else if (type === 'J') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0]
            ];
        } else if (type === 'O') {
            return [
                [4, 4],
                [4, 4]
            ];
        } else if (type === 'S') {
            return [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0]
            ];
        } else if (type === 'Z') {
            return [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0]
            ];
        } else if (type === 'I') {
            return [
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0]
            ];
        }
    }
}