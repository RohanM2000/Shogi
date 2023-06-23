import SteppablePiece from "./steppablePiece";
export default class HonorableHorse extends SteppablePiece{
    steps() {
        if (this.promoted) {
            return [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [-1, 0]];
        } else {
            return [[2, -1], [2, 1]];
        }
    }
    dup(board) {
        return new HonorableHorse(this.color, [this.position[0], this.position[1]], board, this.promoted);
    }
    name() {
        return "HonorableHorse";
    }
}