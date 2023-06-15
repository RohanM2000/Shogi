import validPosition from "../validPosition";
export default class Lance {
    constructor(color, position, board) {
        this.color = color;
        this.position = position;
        this.board = board;
        this.promoted = false;
    }
    moves() {
        const newPositions = [];
        this.steps().forEach((step)=> {
            if (this.color === "white") {
                const newPos = [this.position[0] + step[0], this.position[1] + step[1]];
                if (validPosition(newPos)) {
                    newPositions.push(newPos);
                }
            } else {
                const newPos = [this.position[0] - step[0], this.position[1] - step[1]];
                if (validPosition(newPos)) {
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
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        }
    }
    dirs() {
        return [[1,0]];
    }
    grow(dir, curLen = 0) {
        
    }
}