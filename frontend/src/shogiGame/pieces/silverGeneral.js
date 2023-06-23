import SteppablePiece from "./steppablePiece";
export default class SilverGeneral extends SteppablePiece{
    steps() {
        if (this.promoted) {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        } else {
            return [[1, 0], [1, -1], [1, 1], [-1, -1], [-1, 1]];
        }
    }
    dup(board) {
        return new SilverGeneral(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "SilverGeneral";
    }
}