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


function mapPiece(gamePlayBoard, idx) {
    const row = Math.floor(idx/9);
    const col = idx % 9;
    const piece = gamePlayBoard.board.grid[row][col];

    const name = piece.constructor.name;
    // console.log(name);

    switch(name) {
        case "Footsoldier":
            return <Pawn key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "Lance":
            return <Lance key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "SilverGeneral":
            return <SilverGen key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "GoldGeneral":
            return <GoldGen key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "HonorableHorse":
            return <Knight key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>        
        case "FlyingChariot":
            return <Rook key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "Bishop":
            return <Bishop key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        case "JewelledGeneral":
            return <KingBlack key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(x,y)=> console.log(x,y)}/>
        default:
            return null;
    }
}

export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const [move, setMove] = useState("");
    const game = useSelector(state=> state.games[gameId]);
    let curGame;
    if (game) {
        curGame = new Game(game.white_id, game.black_id);
        // curGame.board.makeMove("white",[2,0],[3,0])
    }
    console.log(curGame);
    useEffect(()=>{
        dispatch(fetchGame(gameId));
        const subscription = consumer.subscriptions.create({
            channel: "GamesChannel", id: gameId
        }, {
            received(game) {
                dispatch(receiveGame(game));
            }
        });

        return () => subscription?.unsubscribe();

    },[gameId, dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        
        dispatch(updateGame({
            gameId, move
        }));

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
                {tempArr.map((temp,idx)=>mapPiece(curGame, idx))}
            </div>
        </>
    ) : null;
}
