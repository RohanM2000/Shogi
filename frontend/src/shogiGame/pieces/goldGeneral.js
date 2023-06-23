import SteppablePiece from "./steppablePiece";
export default class GoldGeneral extends SteppablePiece{
    steps() {
        if (this.promoted) {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        } else {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        }
    }
    dup(board) {
        return new GoldGeneral(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "GoldGeneral";
    }
}