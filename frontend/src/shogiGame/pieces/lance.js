import HybridPiece from "./hybridPiece";
export default class Lance extends HybridPiece{
    moves() {
        let newPositions = [];
        if (this.promoted) {
            newPositions = newPositions.concat(this.stepMoves());
        } else {
            newPositions = newPositions.concat(this.slideMoves());
        }
        return newPositions;
    }
    steps() {
        return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
    }
    dirs() {
        return [[1,0]];
    }
    dup(board) {
        return new Lance(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "Lance";
    }
}