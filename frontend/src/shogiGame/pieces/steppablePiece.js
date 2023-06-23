import validPosition from "../validPosition";
import Piece from "./piece";
export default class SteppablePiece extends Piece{
    moves() {
        const [x,y] = this.position;
        const newPositions = [];
        const steps = [];
        if (this.color === "white") {
            this.steps().forEach((step)=>steps.push([step[0],step[1]]));
        } else {
            this.steps().forEach((step)=>steps.push([-step[0],-step[1]]));
        }
        steps.forEach((step)=>{
            const newPos = [x + step[0], y + step[1]];
                if (validPosition(newPos) && this.color !== this.board.grid[newPos[0]][newPos[1]].color) {
                    newPositions.push(newPos);
                }
        })
        return newPositions;
    }
}