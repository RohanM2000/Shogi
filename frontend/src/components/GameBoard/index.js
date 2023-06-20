import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, receiveGame } from "../../store/games";
import { updateGame } from "../../store/games";
import consumer from "../../consumer";
import "./GameBoard.scss";
import Lance from "./gamePieces/kyosha";
import King from "./gamePieces/osho";
import GoldGen from "./gamePieces/kinsho";
import Knight from "./gamePieces/keima";
import Bishop from "./gamePieces/kakugyo";
import Rook from "./gamePieces/hisha";
import KingBlack from "./gamePieces/gyokusho";
import SilverGen from "./gamePieces/ginsho";
import Pawn from "./gamePieces/fuhyo";
import Game from "../../shogiGame/game";


function mapPiece(gamePlayBoard, idx, handleMove) {
    const row = Math.floor(idx/9);
    const col = idx % 9;
    const piece = gamePlayBoard.board.grid[row][col];

    const name = piece.constructor.name;
    // console.log(name);

    switch(name) {
        case "Footsoldier":
            return <Pawn key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "Lance":
            return <Lance key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "SilverGeneral":
            return <SilverGen key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "GoldGeneral":
            return <GoldGen key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "HonorableHorse":
            return <Knight key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>        
        case "FlyingChariot":
            return <Rook key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "Bishop":
            return <Bishop key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        case "JewelledGeneral":
            return <KingBlack key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(gamePlayBoard, piece.color, pos1, pos2)}/>
        default:
            return null;
    }
}

export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const [move, setMove] = useState("");
    const game = useSelector(state=> state.games[gameId]);
    const [moveCount, setMoveCount] = useState(0);
    let curGame;
    const gameLength = useRef(0);
    if (game) {
        curGame = new Game(game.white_id, game.black_id);
        let moves = game.body.split(" ");
        // console.log(moves);
        // moves = moves.map(arr=>arr.split(".")[1]);
        // console.log(moves);
        moves = moves.map(unfilteredMove => unfilteredMove.split("-").map(stringMove=>stringMove.split(",").map(stringInt=>parseInt(stringInt))));
        gameLength.current = moves.length;
        // console.log(moves);
        // curGame.board.makeMove("white",[2,0],[3,0])
        for (let i = 0; i < moveCount; i++) {
            const tempColor = (i % 2 === 0) ? "white" : "black";
            if (i < moves.length) {
                curGame.board.makeMove(tempColor, ...moves[i])
                // console.log("attemping to make move", curGame.board.makeMove(tempColor, ...moves[i]));
            }
        }
        // console.log(curGame.board);
    }
    // console.log(curGame);
    const handleKeyPress = (e) => {
        e.preventDefault();

        if (e.key === "ArrowRight") {
            setMoveCount(state=>{
                if (state === gameLength.current) return state;
                return state + 1;
            })
        }
        if (e.key === "ArrowLeft") {
            setMoveCount(state=>{
                if (state === 0) return state;
                return state - 1;
            })
        }
    }
    useEffect(()=>{
        dispatch(fetchGame(gameId)).then(document.addEventListener("keydown", handleKeyPress))
        // document.addEventListener("keydown", handleKeyPress);
        const subscription = consumer.subscriptions.create({
            channel: "GamesChannel", id: gameId
        }, {
            received(game) {
                // dispatch(receiveGame(game));
            }
        });
        return () => {
            subscription?.unsubscribe();
            document.removeEventListener("keydown",handleKeyPress);
        }

    },[gameId, dispatch]);

    useEffect(()=>{
        if (game) {
            setMoveCount(game.body.split(" ").length);
        }
    },[game])

    function handleSubmit(e) {
        e.preventDefault();
        
        dispatch(updateGame({
            gameId, move
        }));
    }

    function parseMove(pos1, pos2) {
        return pos1[0] + "," + pos1[1] + "-" + pos2[0] + "," + pos2[1];
    }

    function handleMove(gamePlayBoard, color, pos1, pos2) {
        const result = gamePlayBoard.board.makeMove(color, pos1, pos2);
        if (result) {
            console.log("the move resulted in a ", result, "being captured");
            dispatch(updateGame({
                gameId,
                move: parseMove(pos1, pos2)
            })).then(setMoveCount(state=>state+1));
        } else {
            console.log("failed move!", result);
            return false;
        }
    }
    const tempArr = [];
    for (let i = 0; i < 81; i++) {
        tempArr.push("");
    }
    return game ? (
        <>
            <p>{game.body}</p>
            <form onSubmit={handleSubmit}>
                <input value={move} onChange={(e)=>setMove(e.target.value)}/>
            </form>
            <div className="game-board">
                {tempArr.map((temp,idx)=> <div key={idx} dataid={idx} 
                onMouseDown={(e=>console.log("mousedown on", e.currentTarget.getAttribute("dataid")))}
                onMouseUp={(e=>console.log("mouseup on", e.currentTarget.getAttribute("dataid")))}
                ></div>)}
                {/* <Lance startLeft={24} startTop={1} color="white" /> */}
                {/* <Lance startLeft={4} startTop={1} color="black" /> */}
                {/* {tempArr.map((temp,idx)=> {
                    const row = Math.floor(idx/9);
                    const col = idx % 9;
                    if (idx % 2 == 0) return <Pawn key={idx} startLeft={4 + 52 * row} startTop={1 + 52 * col} color="black" moveFunc={(x,y)=> console.log(x,y)}/>
                })} */}
                {tempArr.map((temp,idx)=>mapPiece(curGame, idx, handleMove))}
            </div>
        </>
    ) : null;
}
