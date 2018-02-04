const pieces = {
    'T': [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    'L': [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2]
    ],
    'J': [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0]
    ],
    'O': [
        [4, 4],
        [4, 4]
    ],
    'S': [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    'Z': [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0]
    ],
    'I': [
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0]
    ],
};

const tetri = [];
const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
});

function createPiece(type) {
    switch(type) {
        case 'T': return pieces.T; break;
        case 'L': return pieces.L; break;
        case 'J': return pieces.J; break;
        case 'O': return pieces.O; break;
        case 'S': return pieces.S; break;
        case 'Z': return pieces.Z; break;
        case 'I': return pieces.I; break;
        default: return pieces.T; break;
    }
}

const keyhandlers = (event) => {
    [
        [65, 68, 81, 69, 83],
        [72, 75, 89, 73, 74]
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            }
        }
        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        } 
    });
};

document.addEventListener('keydown', keyhandlers);
document.addEventListener('keyup', keyhandlers);