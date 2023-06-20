import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, receiveGame } from "../../store/games";
import { updateGame } from "../../store/games";
import consumer from "../../consumer";
import "./GameBoard.scss";
import Lance from "./gamePieces/kyosha";
export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const [move, setMove] = useState("");
    const game = useSelector(state=> state.games[gameId]);
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
                {tempArr.map((temp,idx)=> {
                    const row = Math.floor(idx/9);
                    const col = idx % 9;
                    return <Lance key={idx} startLeft={4 + 52 * row} startTop={1 + 52 * col} color="black" />
                })}
            </div>
        </>
    ) : null;
}