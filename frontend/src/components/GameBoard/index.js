import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, receiveGame } from "../../store/games";
import { updateGame } from "../../store/games";
import consumer from "../../consumer";
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

    return game ? (
        <>
            <p>{game.body}</p>
            <form onSubmit={handleSubmit}>
                <input value={move} onChange={(e)=>setMove(e.target.value)}/>
            </form>
        </>
    ) : null;
}