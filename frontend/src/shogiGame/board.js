import nullPiece from "./pieces/nullPiece";
import Footsoldier from "./pieces/footsoldier";
import GoldGeneral from "./pieces/goldGeneral";
import SilverGeneral from "./pieces/silverGeneral";
import HonorableHorse from "./pieces/honorableHorse";
import JewelledGeneral from "./pieces/jewelledGeneral";
import Lance from "./pieces/lance";
import FlyingChariot from "./pieces/flyingChariot";
import Bishop from "./pieces/bishop";
export default class Board {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 9; i++) {
            let temp = [];
            for (let j = 0; j < 9; j++) {
                temp.push(nullPiece);
            }
            this.grid.push(temp);
        }


        this.grid[2][0] = new Footsoldier("white", [2,0], this);
        this.grid[2][1] = new Footsoldier("white", [2,1], this);
        this.grid[2][2] = new Footsoldier("white", [2,2], this);
        this.grid[2][3] = new Footsoldier("white", [2,3], this);
        this.grid[2][4] = new Footsoldier("white", [2,4], this);
        this.grid[2][5] = new Footsoldier("white", [2,5], this);
        this.grid[2][6] = new Footsoldier("white", [2,6], this);
        this.grid[2][7] = new Footsoldier("white", [2,7], this);
        this.grid[2][8] = new Footsoldier("white", [2,8], this);

        this.grid[6][0] = new Footsoldier("black", [6,0], this);
        this.grid[6][1] = new Footsoldier("black", [6,1], this);
        this.grid[6][2] = new Footsoldier("black", [6,2], this);
        this.grid[6][3] = new Footsoldier("black", [6,3], this);
        this.grid[6][4] = new Footsoldier("black", [6,4], this);
        this.grid[6][5] = new Footsoldier("black", [6,5], this);
        this.grid[6][6] = new Footsoldier("black", [6,6], this);
        this.grid[6][7] = new Footsoldier("black", [6,7], this);
        this.grid[6][8] = new Footsoldier("black", [6,8], this);

        this.grid[1][1] = new Bishop("white", [1,1], this);
        this.grid[7][7] = new Bishop("black", [7,7], this);

        this.grid[1][7] = new FlyingChariot("white", [1,7], this);
        this.grid[7][1] = new FlyingChariot("black", [7,1], this);

        this.grid[0][0] = new Lance("white", [0,0], this);
        this.grid[0][8] = new Lance("white", [0,8], this);
        this.grid[8][0] = new Lance("black", [8,0], this);
        this.grid[8][8] = new Lance("black", [8,8], this);

        this.grid[0][1] = new HonorableHorse("white", [0,1], this);
        this.grid[0][7] = new HonorableHorse("white", [0,7], this);
        this.grid[8][1] = new HonorableHorse("black", [8,1], this);
        this.grid[8][7] = new HonorableHorse("black", [8,7], this);

        this.grid[0][2] = new SilverGeneral("white", [0,2], this);
        this.grid[0][6] = new SilverGeneral("white", [0,6], this);
        this.grid[8][2] = new SilverGeneral("black", [8,2], this);
        this.grid[8][6] = new SilverGeneral("black", [8,6], this);

        this.grid[0][3] = new GoldGeneral("white", [0,3], this);
        this.grid[0][5] = new GoldGeneral("white", [0,5], this);
        this.grid[8][3] = new GoldGeneral("black", [8,3], this);
        this.grid[8][5] = new GoldGeneral("black", [8,5], this);

        this.grid[0][4] = new JewelledGeneral("white", [0,4], this);
        this.grid[8][4] = new JewelledGeneral("black", [8,4], this);



        // console.log(this.grid);
        // console.log(this.allMoves("white"));
        // console.log(this.allMoves("black"));
        // console.log(this.allMoves("white"));
        // console.log(this.inCheck("black"));
        // console.log(this.inCheck("white"));
        this.playerFirst = "";
        this.playerSecond = "";
    }

    makeMove(color, pos1, pos2, override = false) {
        if (override) {
            const cappedPiece = this.grid[pos2[0]][pos2[1]];
            this.grid[pos2[0]][pos2[1]] = this.grid[pos1[0]][pos1[1]];
            this.grid[pos1[0]][[pos1[1]]] = nullPiece;
            this.grid[pos2[0]][pos2[1]].position = [pos2[0], pos2[1]];
            return cappedPiece;
        } else {
            const validMoves = this.validMoves(color);
            let valid = false;
            // console.log(validMoves, pos1, pos2, color)
            validMoves.forEach((move)=> {
                if (move[0][0] === pos1[0] && move[0][1] === pos1[1] 
                    && move[1][0] === pos2[0] && move[1][1] === pos2[1]) {
                        valid = true;
                    }
            })
            if (valid) {
                const cappedPiece = this.grid[pos2[0]][pos2[1]];
                this.grid[pos2[0]][pos2[1]] = this.grid[pos1[0]][pos1[1]];
                this.grid[pos1[0]][[pos1[1]]] = nullPiece;
                this.grid[pos2[0]][pos2[1]].position = [pos2[0], pos2[1]];
                return cappedPiece;
            } else {
                return false;
            }
        }
    }

    inCheck(color) {
        let kingPos;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] instanceof JewelledGeneral && this.grid[i][j].color === color) {
                    kingPos = [i,j];
                }
            }
        }
        // console.log(color, kingPos);
        let hit = false;
        if (color === "white") {
            const oppMoves = this.allMoves("black");
            oppMoves.forEach(tuple => {
                if (tuple[1][0] === kingPos[0] && tuple[1][1] === kingPos[1]) {
                    hit = true;
                }
            })
        } else {
            const oppMoves = this.allMoves("white");
            oppMoves.forEach(tuple => {
                // console.log(tuple[1][0] === kingPos[0] && tuple[1][1] === kingPos[1]);
                if (tuple[1][0] === kingPos[0] && tuple[1][1] === kingPos[1]) {
                    // console.log("been hit")
                    hit = true;
                }
            })
        }
        return hit;
    }

    allMoves(color) {
        const totalMoves = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j].color === color) {
                    const endPositions = this.grid[i][j].moves();
                    endPositions.forEach(pos => totalMoves.push([[i,j],pos]));
                }
            }
        }
        return totalMoves;
    }

    dup() {
        const dupedBoard = new Board();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j].color){
                    dupedBoard.grid[i][j] = this.grid[i][j].dup(dupedBoard);
                } else {
                    dupedBoard.grid[i][j] = nullPiece;
                }
            }
        }
        return dupedBoard;
    }

    validMoves(color) {
        const originalMoves = this.allMoves(color);

        const goodMoves = [];
        originalMoves.forEach((move)=>{
            const dupedBoard = this.dup();
            dupedBoard.makeMove(color, move[0], move[1], true);
            if (!dupedBoard.inCheck(color)) {
                goodMoves.push(move);
            }
        });
        return goodMoves;
    }

    isOccupied(position) {
        if (this.grid[position[0]][position[1]].color) return true;
        return false;
    }

    dropPiece(color, position, type) {
        const [x, y] = position;

        switch(type) {
            case "p":
                this.grid[x][y] = new Footsoldier(color, position, this);
                return true;
            case "l":
                this.grid[x][y] = new Lance(color, position, this);
                return true;
            case "s":
                this.grid[x][y] = new SilverGeneral(color, position, this);
                return true;
            case "g":
                this.grid[x][y] = new GoldGeneral(color, position, this);
                return true;
            case "r":
                this.grid[x][y] = new FlyingChariot(color, position, this);
                return true;
            case "h":
                this.grid[x][y] = new HonorableHorse(color, position, this);
                return true;
            case "b":
                this.grid[x][y] = new Bishop(color, position, this);
                return true;
            default:
                return false;
        }
    }

    isCheckmate(color) {
        if (this.validMoves(color).length < 1 && this.inCheck(color)) return true;
        return false;
    }
}