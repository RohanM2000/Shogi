import validPosition from "../validPosition";
export default class Footsoldier {
    constructor(color, position, board, promoted = false) {
        this.color = color;
        this.position = position;
        this.board = board;
        this.promoted = promoted;
    }
    moves() {
        const newPositions = [];
        this.steps().forEach((step)=> {
            if (this.color === "white") {
                const newPos = [this.position[0] + step[0], this.position[1] + step[1]];
                if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                    newPositions.push(newPos);
                }
            } else {
                const newPos = [this.position[0] - step[0], this.position[1] - step[1]];
                if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                    newPositions.push(newPos);
                }
            }
        });
        return newPositions;
    }
    steps() {
        if (this.promoted) {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        } else {
            return [[1, 0]];
        }
    }
    dup(board) {
        return new Footsoldier(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
}