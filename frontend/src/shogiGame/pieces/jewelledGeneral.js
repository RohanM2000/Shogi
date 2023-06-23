import SteppablePiece from "./steppablePiece";
export default class JewelledGeneral extends SteppablePiece {
    steps() {
        if (this.promoted) {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
        } else {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
        }
    }
    dup(board) {
        return new JewelledGeneral(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "JewelledGeneral";
    }
}