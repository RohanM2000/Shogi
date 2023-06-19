import Board from "./board";
export default class Game {
    constructor(player1Id, player2Id) {
        this.whiteId = player1Id;
        this.blackId = player2Id;
        this.currentPlayer = "white";
        this.board = new Board();
    }
    swap() {
        this.currentPlayer = (this.currentPlayer === "white") ? "black" : "white";
    }
}