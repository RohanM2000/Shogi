import nullPiece from "./pieces/nullPiece";
class Board {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 9; i++) {
            let temp = [];
            for (let j = 0; j < 9; j++) {
                temp.push("");
            }
            this.grid.push(temp);
        }
        this.playerFirst = "";
        this.playerSecond = "";
    }

    makeMove(pos1, pos2) {
        this.grid[pos2[0]][pos2[1]] = this.grid[pos1[0]][pos1[1]];
        this.grid[pos1[0]][[pos1[1]]] = nullPiece;
    }
}