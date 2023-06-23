import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, receiveGame } from "../../store/games";
import { updateGame } from "../../store/games";
import consumer from "../../consumer";
import "./GameBoard.scss";
import Piece from "./gamePieces/piece";
import Game from "../../shogiGame/game";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function mapPiece(gamePlayBoard, idx, handleMove, totBoard) {
    const row = Math.floor(idx/9);
    const col = idx % 9;
    const piece = gamePlayBoard.board.grid[row][col];

    // const name = piece.constructor.name;
    const name = piece.name();

    return <Piece key={idx} startLeft={4 + 52 * col} startTop={417 - (1 + 52 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(totBoard, piece.color, pos1, pos2)} name={name} />
}

export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(state=> state.games[gameId]);
    const [moveCount, setMoveCount] = useState(0);
    const user = useSelector(state=> state.session.user);
    const gameLength = useRef(0);
    
    
    function parseMove(pos1, pos2) {
        return pos1[0] + "," + pos1[1] + "-" + pos2[0] + "," + pos2[1];
    };
    let curGame;
    let totalGame;
    if (game) {
        curGame = new Game(game.white_id, game.black_id);
        totalGame = new Game(game.white_id, game.black_id);
        let moves = game.body.split(" ");
        moves = moves.map(unfilteredMove => unfilteredMove.split("-").map(stringMove=>stringMove.split(",").map(stringInt=>parseInt(stringInt))));
        gameLength.current = moves.length;
        for (let i = 0; i < moveCount; i++) {
            const tempColor = (i % 2 === 0) ? "white" : "black";
            if (i < moves.length) {
                curGame.board.makeMove(tempColor, ...moves[i]);
            }
        }
        for (let i = 0; i < gameLength.current; i++) {
            const tempColor = (i % 2 === 0) ? "white" : "black";
            if (i < moves.length) {
                totalGame.board.makeMove(tempColor, ...moves[i]);
                totalGame.swap();
            }
        }
    }
    const handleKeyPress = (e) => {
        // e.preventDefault(); DO NOT PREVENT DEFAULT, OR WILL LEAD TO ISSUES TYPING IN THE CHATBOX

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
    };
    useEffect(()=>{
        dispatch(fetchGame(gameId)).then(document.addEventListener("keydown", handleKeyPress))
        // document.addEventListener("keydown", handleKeyPress);
        const subscription = consumer.subscriptions.create({
            channel: "GamesChannel", id: gameId
        }, {
            received(game) {
                dispatch(receiveGame(game));
            }
        });
        return () => {
            subscription?.unsubscribe();
            document.removeEventListener("keydown",handleKeyPress);
        };

    },[gameId, dispatch]);
    
    useEffect(()=>{
        if (game) {
            setMoveCount(game.body.split(" ").length);
            console.log("status", game.status);
        }
    },[game]);
      

    function handleMove(gamePlayBoard, color, pos1, pos2) {
        if (color !== gamePlayBoard.currentPlayer) return false;
        const result = gamePlayBoard.board.makeMove(color, pos1, pos2);
        if (result) {
            let status = "ongoing";
            if (gamePlayBoard.board.isCheckmate("black")) {
                    status = "white won";
            }
            if (gamePlayBoard.board.isCheckmate("white")) {
                    status = "black won";
            }
            dispatch(updateGame({
                gameId,
                move: parseMove(pos1, pos2),
                status
            })).then(setMoveCount(state=>state+1));
        } else {
            console.log("failed move!", result);
            return false;
        }
    };
    const tempArr = [];
    for (let i = 0; i < 81; i++) {
        tempArr.push("");
    }
    if (!user) {
        return <Redirect to="/" />;
    } 
    return game ? (
        <div className="game-area">
            <div className="opposite player-tag">
                {}
            </div>
            <div className="game-board">
                {tempArr.map((temp,idx)=> <div key={idx} ></div>)}
                {tempArr.map((temp,idx)=>mapPiece(curGame, idx, handleMove, totalGame))}
            </div>
            <div className="player-tag">
                {}
            </div>
        </div>
    ) : null;
};
