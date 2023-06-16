export default class Piece {
    constructor(color, position, board, promoted = false) {
        this.color = color;
        this.position = position;
        this.board = board;
        this.promoted = promoted;
    }
}