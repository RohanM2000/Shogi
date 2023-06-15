import validPosition from "../validPosition";
export default class Bishop {
    constructor(color, position, board) {
        this.color = color;
        this.position = position;
        this.board = board;
        this.promoted = false;
    }
    moves() {
        const newPositions = [];
        if (this.promoted) {
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
        }
        if (this.color === "white") {
            this.dirs().forEach((dir)=> {
                const length = this.grow(dir);
                for (let i = 1; i <= length; i++) {
                    const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
                    if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                        newPositions.push(newPos);
                    }
                }
            })
        } else {
            const blackDirs = [];
            const dirs = this.dirs();
            dirs.forEach((dir)=>blackDirs.push([-dir[0], -dir[1]]));
            blackDirs.forEach((dir)=> {
                const length = this.grow(dir);
                for (let i = 1; i <= length; i++) {
                    const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
                    if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                        newPositions.push(newPos);
                    }
                }
            })
        }
        
        return newPositions;
    }
    steps() {
        return [[1,0],[0,1],[-1,0],[0,-1]];
    }
    dirs() {
        return [[1,1], [1,-1], [-1,1], [-1,-1]];
    }
    grow(dir, curLen = 0) {
        const newPos = [this.position[0] + (curLen + 1) * dir[0], this.position[1] + (curLen + 1) * dir[1]];
        if (!validPosition(newPos)) return curLen;
        if (this.board.grid[newPos[0]][newPos[1]].color === this.color) {
            return curLen;
        }
        if (this.board.grid[newPos[0]][newPos[1]].color && this.board.grid[newPos[0]][newPos[1]].color !== this.color) return curLen + 1;
        return this.grow(dir, curLen + 1);
    }
}