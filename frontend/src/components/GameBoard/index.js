import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, receiveGame } from "../../store/games";
import { updateGame } from "../../store/games";
import consumer from "../../consumer";
import "./GameBoard.css";
// import {ReactComponent as Lance} from "./kyosha.svg";
export default function GameBoard () {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const [move, setMove] = useState("");
    const game = useSelector(state=> state.games[gameId])
    useEffect(()=>{
        dispatch(fetchGame(gameId));
        const subscription = consumer.subscriptions.create({
            channel: "GamesChannel", id: gameId
        }, {
            received(game) {
                dispatch(receiveGame(game));
                // console.log(game);
            }
        })

        return () => subscription?.unsubscribe();

    },[gameId, dispatch]);


    function handleSubmit(e) {
        e.preventDefault();
        
        dispatch(updateGame({
            gameId, move
        }))

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
                onMouseDown={(e=>console.log("mousedown on", e.target.getAttribute("dataid")))}
                onMouseUp={(e=>console.log("mouseup on", e.target.getAttribute("dataid")))}
                />)}
                {/* <Lance /> */}
            </div>
        </>
    ) : null;
}