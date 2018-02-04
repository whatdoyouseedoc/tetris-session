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
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;        
            this.player.update(deltaTime);        
            this.draw();
            requestAnimationFrame(update);
        };
        update();
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

    updateScore(score) {
        this.element.querySelector('.score').innerText = score;
    }
}