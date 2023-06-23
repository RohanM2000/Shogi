import SteppablePiece from "./steppablePiece";
export default class Footsoldier extends SteppablePiece{
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
    name() {
        return "Footsoldier";
    }
}