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
import { Modal } from "../../context/Modal";
import { receiveModal, removeModal, getModal } from "../../store/modals";
import GameOver from "../GameOverModal";
import { fetchUsers } from "../../store/users";

function mapPiece(gamePlayBoard, idx, handleMove, totBoard, flip, viewHeight) {
    const row = Math.floor(idx/9);
    const col = idx % 9;
    const piece = gamePlayBoard.board.grid[row][col];
    // const name = piece.constructor.name;
    const name = piece.name();
    if (flip) {
        return <Piece key={idx} startLeft={viewHeight/1.5 - (viewHeight/12.15 * col)} startTop={viewHeight/500 + viewHeight/12.17 * row} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(totBoard, piece.color, pos1, pos2)} name={name} flip={true} viewHeight={viewHeight}/>
    }
    return <Piece key={idx} startLeft={viewHeight/120 + viewHeight/12.17 * col} startTop={viewHeight/1.515 - (viewHeight/12.15 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(totBoard, piece.color, pos1, pos2)} name={name} viewHeight={viewHeight}/>
}

export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(state=> state.games[gameId]);
    const [moveCount, setMoveCount] = useState(0);
    const user = useSelector(state=> state.session.user);
    const gameLength = useRef(0);
    const showModal = useSelector(getModal("gameover"));
    const users = useSelector(state=>state.users);
    function parseMove(pos1, pos2) {
        return pos1[0] + "," + pos1[1] + "-" + pos2[0] + "," + pos2[1];
    };
    const [viewHeight, setViewHeight] = useState(window.innerHeight);
    useEffect(()=>{
        function handleResize() {
            setViewHeight(window.innerHeight);
        };
    
        window.addEventListener("resize", handleResize);
    
        return ()=> window.removeEventListener("resize", handleResize);
    },[]);
    let curGame;
    let totalGame;
    if (game) {
        curGame = new Game(game.white_id, game.black_id);
        totalGame = new Game(game.white_id, game.black_id);
        let moves = game.body.split(" ");
        moves = moves.map(unfilteredMove => unfilteredMove.split("-").map(stringMove=>stringMove.split(",").map(stringInt=>parseInt(stringInt))));
        gameLength.current = moves.length;
        for (let i = 1; i < moveCount; i++) {
            const tempColor = (i % 2 === 1) ? "white" : "black";
            if (i < moves.length) {
                curGame.board.makeMove(tempColor, ...moves[i]);
            }
        }
        for (let i = 1; i < gameLength.current; i++) {
            const tempColor = (i % 2 === 1) ? "white" : "black";
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
            });
        }
        if (e.key === "ArrowLeft") {
            setMoveCount(state=>{
                if (state <= 1) return state;
                return state - 1;
            });
        }
    };
    useEffect(()=>{
        dispatch(fetchUsers());
        dispatch(fetchGame(gameId)).then(document.addEventListener("keydown", handleKeyPress));
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
            if (game.status !== "ongoing" && game.status !== "started") {
                dispatch(receiveModal("gameover"));
            }
        }
    },[game]);
      

    function handleMove(gamePlayBoard, color, pos1, pos2) {
        if (color !== gamePlayBoard.currentPlayer) return false;
        if (color === "white" && user.id !== game.white_id) return false;
        if (color === "black" && user.id !== game.black_id) return false;
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
    let topName;
    let bottomName;
    let topClass = "player-tag";
    let bottomClass = "player-tag";
    let topImg;
    let bottomImg;
    if (users && game && users[game.white_id] && users[game.black_id]) {
        if (user.id === game.black_id) {
            bottomName = users[game.black_id].username;
            topName = users[game.white_id].username;
            topClass += " white-player";
            bottomClass += " black-player"
            if (totalGame.currentPlayer === "white") {
                topClass += " move-active";
            } else {
                bottomClass += " move-active";
            }
            topImg = users[game.white_id].photoUrl;
            bottomImg = users[game.black_id].photoUrl;
        } else {
            bottomName = users[game.white_id].username;
            topName = users[game.black_id].username;
            topClass += " black-player";
            bottomClass += " white-player";
            if (totalGame.currentPlayer === "white") {
                bottomClass += " move-active";
            } else {
                topClass += " move-active";
            }
            topImg = users[game.black_id].photoUrl;
            bottomImg = users[game.white_id].photoUrl;
        }
    }
    
    return game ? (
        <>
            <div className="game-container">
                <div className="game-area">
                    <div className={topClass}>
                        <img src={topImg} />
                        <strong>
                            {topName}
                        </strong>
                    </div>
                    <div className="game-board">
                        {tempArr.map((temp,idx)=> <div key={idx} ></div>)}
                        {tempArr.map((temp,idx)=> mapPiece(curGame, idx, handleMove, totalGame, user.id === game.black_id, viewHeight))}
                    </div>
                    <div className={bottomClass}>
                        <img src={bottomImg} />
                        <strong>
                            {bottomName}
                        </strong>
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal onClose={()=>dispatch(removeModal())} type="gameover">
                    <GameOver game={game} users={users}/>
                </Modal>
            }
        </>
    ) : null;
};
