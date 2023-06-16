import Piece from "./piece";
import validPosition from "../validPosition";

export default class HybridPiece extends Piece{
    moves() {
        let newPositions = [];
        // if (this.promoted) {
        //     this.steps().forEach((step)=> {
        //         if (this.color === "white") {
        //             const newPos = [this.position[0] + step[0], this.position[1] + step[1]];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         } else {
        //             const newPos = [this.position[0] - step[0], this.position[1] - step[1]];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         }
        //     });
        // }
        // if (this.color === "white") {
        //     this.dirs().forEach((dir)=> {
        //         const length = this.grow(dir);
        //         for (let i = 1; i <= length; i++) {
        //             const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         }
        //     })
        // } else {
        //     const blackDirs = [];
        //     const dirs = this.dirs();
        //     dirs.forEach((dir)=>blackDirs.push([-dir[0], -dir[1]]));
        //     blackDirs.forEach((dir)=> {
        //         const length = this.grow(dir);
        //         for (let i = 1; i <= length; i++) {
        //             const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         }
        //     })
        // }
        if (this.promoted) {
            newPositions = newPositions.concat(this.stepMoves());
        }
        newPositions = newPositions.concat(this.slideMoves());
        return newPositions;
    }
    stepMoves() {
        const newPositions = [];
        const [x, y] = this.position;
        const steps = [];
        if (this.color === "white") {
            this.steps().forEach((step)=>steps.push([step[0],step[1]]));
        } else {
            this.steps().forEach((step)=>steps.push([-step[0],-step[1]]));
        }
        steps.forEach((step)=> {
            const newPos = [x + step[0], y + step[1]];
                if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                    newPositions.push(newPos);
                }
        })
        // this.steps().forEach((step)=> {
        //     if (this.color === "white") {
        //         const newPos = [x + step[0], y + step[1]];
        //         if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //             newPositions.push(newPos);
        //         }
        //     } else {
        //         const newPos = [x - step[0], y - step[1]];
        //         if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //             newPositions.push(newPos);
        //         }
        //     }
        // });
        return newPositions;
    }
    slideMoves() {
        const newPositions = [];
        const [x,y] = this.position;
        let dirs = [];
        if (this.color === "white") {
            this.dirs().forEach((dir)=>dirs.push([dir[0], dir[1]]));
        } else {
            this.dirs().forEach((dir)=>dirs.push([-dir[0], -dir[1]]));
        }

        dirs.forEach((dir)=> {
            const length = this.grow(dir);
            for (let i = 1; i <= length; i++) {
                const newPos = [x + dir[0] * i, y + dir[1] * i];
                if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                    newPositions.push(newPos);
                }
            }
        })

        // if (this.color === "white") {
        //     this.dirs().forEach((dir)=> {
        //         const length = this.grow(dir);
        //         for (let i = 1; i <= length; i++) {
        //             const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         }
        //     })
        // } else {
        //     const blackDirs = [];
        //     const dirs = this.dirs();
        //     dirs.forEach((dir)=>blackDirs.push([-dir[0], -dir[1]]));
        //     blackDirs.forEach((dir)=> {
        //         const length = this.grow(dir);
        //         for (let i = 1; i <= length; i++) {
        //             const newPos = [this.position[0] + dir[0] * i, this.position[1] + dir[1] * i];
        //             if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
        //                 newPositions.push(newPos);
        //             }
        //         }
        //     })
        // }

        return newPositions;
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