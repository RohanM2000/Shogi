import HybridPiece from "./hybridPiece";
export default class Bishop extends HybridPiece{
    steps() {
        return [[1,0],[0,1],[-1,0],[0,-1]];
    }
    dirs() {
        return [[1,1], [1,-1], [-1,1], [-1,-1]];
    }
    dup(board) {
        return new Bishop(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "Bishop";
    }
}