import HybridPiece from "./hybridPiece";
export default class FlyingChariot extends HybridPiece {
    steps() {
        return [[1,1],[1,-1],[-1,1],[-1,-1]];
    }
    dirs() {
        return [[1,0], [0,1], [0,-1], [-1,0]];
    }
    dup(board) {
        return new FlyingChariot(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "FlyingChariot";
    }
}