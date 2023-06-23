class Singleton {
    constructor () {
        this.moves = [];
        this.color = null;
        this.board = null;
        this.position = null;
    }
    name() {
        return "Nullpiece";
    }
}

const nullPiece = new Singleton();
Object.freeze(nullPiece);
export default nullPiece;