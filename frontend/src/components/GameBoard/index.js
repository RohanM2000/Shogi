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
import Timer from "../Timer";
import clearPromote from "./clearPromote";

function mapPiece(gamePlayBoard, idx, handleMove, totBoard, flip, viewHeight) {
    const row = Math.floor(idx/9);
    const col = idx % 9;
    const piece = gamePlayBoard.board.grid[row][col];
    // const name = piece.constructor.name;
    const name = piece.name();
    if (!piece.color) return null;
    if (flip) {
        return <Piece key={idx} startLeft={viewHeight/1.5 - (viewHeight/12.15 * col)} startTop={viewHeight/500 + viewHeight/12.17 * row} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(totBoard, piece.color, pos1, pos2)} name={name} flip={true} viewHeight={viewHeight} promoted={piece.promoted}/>
    }
    return <Piece key={idx} startLeft={viewHeight/120 + viewHeight/12.17 * col} startTop={viewHeight/1.515 - (viewHeight/12.15 * row)} color={piece.color} moveFunc={(pos1,pos2)=>handleMove(totBoard, piece.color, pos1, pos2)} name={name} viewHeight={viewHeight} promoted={piece.promoted}/>
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
    const lang = useSelector(state=> state.languages.lang);
    function parseMove(pos1, pos2) {
        return pos1[0] + "," + pos1[1] + "-" + pos2[0] + "," + pos2[1];
    };
    const [viewHeight, setViewHeight] = useState(window.innerHeight);
    const [whiteActive, setWhiteActive] = useState(false);
    const [blackActive, setBlackActive] = useState(false);
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
        const promotes = game.move_data.split(" ")
        .map(data=>data.split(":")[1]);
        // console.log("promotes:", promotes);
        for (let i = 1; i < moveCount; i++) {
            const tempColor = (i % 2 === 1) ? "white" : "black";
            if (i < moves.length) {
                curGame.board.makeMove(tempColor, ...moves[i]);
                if (promotes[i] !== "false") {
                    curGame.board.grid[moves[i][1][0]][moves[i][1][1]].promoted = true;
                }
            }
        }
        for (let i = 1; i < gameLength.current; i++) {
            const tempColor = (i % 2 === 1) ? "white" : "black";
            if (i < moves.length) {
                totalGame.board.makeMove(tempColor, ...moves[i]);
                if (promotes[i] !== "false") {
                    totalGame.board.grid[moves[i][1][0]][moves[i][1][1]].promoted = true;
                }
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
            clearPromote();
            setMoveCount(state=>{
                if (state <= 1) return state;
                return state - 1;
            });
        }
    };
    useEffect(()=>{
        dispatch(fetchUsers()).catch((error)=>console.log(error));
        dispatch(fetchGame(gameId)).then(()=>document.addEventListener("keydown", handleKeyPress)).catch((error)=>console.log(error));
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
            if (game.status !== "ongoing" && game.status !== "started") {
                setWhiteActive(false);
                setBlackActive(false);
                clearPromote();
                dispatch(receiveModal("gameover"));
            } 
            if (game.status === "started") {
                setWhiteActive(false);
                setBlackActive(false);
            }
            if (game.status === "ongoing") {
                const lengthOfGame = game.body.split(" ").length;

                if (lengthOfGame % 2 === 0) {
                    setBlackActive(true);
                    setWhiteActive(false);
                } else {
                    setWhiteActive(true);
                    setBlackActive(false);
                }
            }
        }
    },[game, dispatch]);
      

    function handleMove(gamePlayBoard, color, pos1, pos2) {
        if (color !== gamePlayBoard.currentPlayer) return false;
        if (color === "white" && user.id !== game.white_id) return false;
        if (color === "black" && user.id !== game.black_id) return false;
        if (game.status !== "started" && game.status !== "ongoing") return false;
        let promote = false;
        if (gamePlayBoard.board.mustPromote(color, pos1, pos2)) {
            promote = true;
        }
        const gameArea = document.querySelector("div.game-board");
        if (gamePlayBoard.board.canPromote(color, pos1, pos2) && !promote) {
            const backgroundDiv = document.createElement("div");
            backgroundDiv.classList.add("background-promote");
            const foregroundDiv = document.createElement("div");
            foregroundDiv.classList.add("foreground-promote");
            const explainEle = document.createElement("p");
            if (lang === "en") {
                explainEle.innerText = "Promote?";
            } else {
                explainEle.innerText = "裏返す?";
            }
            const yesButton = document.createElement("button");
            yesButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
            yesButton.onclick = (e) => {
                e.preventDefault();
                gamePlayBoard.board.makeMove(color, pos1, pos2);
                gamePlayBoard.board.grid[pos2[0]][pos2[1]].promoted = true;
                let status = "ongoing";
                if (gamePlayBoard.board.isCheckmate("black")) {
                    status = "white won";
                }
                if (gamePlayBoard.board.isCheckmate("white")) {
                    status = "black won";
                }
                clearPromote();
                dispatch(updateGame({
                    gameId,
                    move: parseMove(pos1, pos2),
                    status,
                    promote: true
                })).then(()=>setMoveCount(state=>state+1)).catch();
            }
            const noButton = document.createElement("button");
            noButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            noButton.onclick = (e) => {
                e.preventDefault();
                gamePlayBoard.board.makeMove(color, pos1, pos2);
                let status = "ongoing";
                if (gamePlayBoard.board.isCheckmate("black")) {
                    status = "white won";
                }
                if (gamePlayBoard.board.isCheckmate("white")) {
                    status = "black won";
                }
                clearPromote();
                dispatch(updateGame({
                    gameId,
                    move: parseMove(pos1, pos2),
                    status,
                    promote: false
                })).then(()=>setMoveCount(state=>state+1)).catch();
            }
            foregroundDiv.appendChild(explainEle);
            foregroundDiv.appendChild(yesButton);
            foregroundDiv.appendChild(noButton);
            gameArea.appendChild(backgroundDiv);
            gameArea.appendChild(foregroundDiv);
        } else {
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
                status,
                promote
            })).then(()=>setMoveCount(state=>state+1)).catch();
            } else {
                return false;
            }
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
    let topTimer;
    let bottomTimer;
    let topShow;
    let bottomShow;
    let topElo;
    let bottomElo;
    if (users && game && users[game.white_id] && users[game.black_id]) {
        if (user.id === game.black_id) {
            bottomName = users[game.black_id].username;
            topName = users[game.white_id].username;
            topClass += " white-player";
            bottomClass += " black-player"
            if (totalGame.currentPlayer === "white") {
                topClass += " move-active";
                topShow = true;
            } else {
                bottomClass += " move-active";
                bottomShow = true;
            }
            topImg = users[game.white_id].photoUrl;
            bottomImg = users[game.black_id].photoUrl;
            topTimer = <Timer game={game} color={"white"} active={whiteActive}/>;
            bottomTimer = <Timer game={game} color={"black"} active={blackActive}/>;
            topElo = users[game.white_id].elos.sort((eloA, eloB) => {
                return Math.sign(new Date(eloA.createdAt).getTime() - new Date(eloB.createdAt).getTime());
             });
            topElo = topElo[topElo.length - 1]?.rating;
            bottomElo = users[game.black_id].elos.sort((eloA, eloB) => {
                return Math.sign(new Date(eloA.createdAt).getTime() - new Date(eloB.createdAt).getTime());
             });
            bottomElo = bottomElo[bottomElo.length - 1]?.rating;
        } else {
            bottomName = users[game.white_id].username;
            topName = users[game.black_id].username;
            topClass += " black-player";
            bottomClass += " white-player";
            if (totalGame.currentPlayer === "white") {
                bottomClass += " move-active";
                bottomShow = true;
            } else {
                topClass += " move-active";
                topShow = true;
            }
            topImg = users[game.black_id].photoUrl;
            bottomImg = users[game.white_id].photoUrl;
            topTimer = <Timer game={game} color={"black"} active={blackActive}/>;
            bottomTimer = <Timer game={game} color={"white"} active={whiteActive}/>;
            topElo = users[game.black_id].elos.sort((eloA, eloB) => {
                return Math.sign(new Date(eloA.createdAt).getTime() - new Date(eloB.createdAt).getTime());
             });
            topElo = topElo[topElo.length - 1]?.rating;
            bottomElo = users[game.white_id].elos.sort((eloA, eloB) => {
                return Math.sign(new Date(eloA.createdAt).getTime() - new Date(eloB.createdAt).getTime());
             });
            bottomElo = bottomElo[bottomElo.length - 1]?.rating;
        }
    }
    
    return game ? (
        <>
            <div className="game-container">
                <div className="game-area">
                    <div className={topClass}>
                        <div>
                            <img src={topImg} alt=""/>
                            <strong>
                                {topName} ({topElo})
                            </strong>
                        </div>
                        <div className="timer-area">
                            {topShow && <i className="fa-solid fa-stopwatch"/>}
                            {topTimer}
                        </div>
                    </div>
                    <div className="game-board">
                        {tempArr.map((temp,idx)=> <div key={idx} ></div>)}
                        {tempArr.map((temp,idx)=> mapPiece(curGame, idx, handleMove, totalGame, user.id === game.black_id, viewHeight))}
                    </div>
                    <div className={bottomClass}>
                        <div>
                            <img src={bottomImg} alt=""/>
                            <strong>
                                {bottomName} ({bottomElo})
                            </strong>
                        </div>
                        <div className="timer-area">
                            {bottomShow && <i className="fa-solid fa-stopwatch"/>}
                            {bottomTimer}
                        </div>
                    </div>
                </div>
            </div>
            {showModal &&
                <Modal onClose={()=>dispatch(removeModal())} type="gameover">
                    <GameOver game={game} />
                </Modal>
            }
        </>
    ) : null;
};
