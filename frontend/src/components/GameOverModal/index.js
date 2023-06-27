import "./GameOverModal.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";
import { useEffect, useState } from "react";
import EloCounter from "./EloCounter";
export default function GameOver({game}) {
    const lang = useSelector(state=>state.languages.lang);
    const currentUser = useSelector(state=>state.session.user);
    const users = useSelector(state=>state.users);
    const history = useHistory();
    const dispatch = useDispatch();
    const [updatedUsers, setUpdatedUsers] = useState(false);
    useEffect(()=>{
            async function handleDispatch() {
            try {
                const res = await dispatch(fetchUsers());
                setUpdatedUsers(true);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (!updatedUsers) handleDispatch();
    },[dispatch, updatedUsers]);
    const whiteUser = users ? users[game.white_id] : null;
    const blackUser = users ? users[game.black_id] : null;
    let winType = "white";
    if (game.status === "black won") {
        winType = "black";
    }
    let displayMessage = "White Wins!";
    if (winType === "black") {
        displayMessage = "Black Wins!";
    }
    if (lang !== "en" && winType === "white") {
        displayMessage = "先手勝つ!";
    }
    if (lang !== "en" && winType !== "white") {
        displayMessage = "後手勝つ!";
    }
    let newElo = 0;
    let prevElo = 0;
    if (currentUser.id && blackUser && whiteUser) {
        if (currentUser.id === blackUser.id) {
            const elos = blackUser.elos.sort((eloA, eloB) => {
                return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
            });
            newElo = elos[0];
            prevElo = elos[1];
        } else {
        const elos = whiteUser.elos.sort((eloA, eloB) => {
            return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
         });
        newElo = elos[0];
        prevElo = elos[1];
        }
    }
    return game && users && whiteUser && blackUser && currentUser ? (
        <div className={winType === "white" ? "game-over-div" : "game-over-div black-winner-style"}>
            <h1><strong>{displayMessage}</strong></h1>
            <div className="image-area">
                <div className="white-player-area profile-area-box">
                    <strong>{whiteUser.username}</strong>
                    <img src={whiteUser.photoUrl} alt="" onClick={()=>history.push(`/members/${whiteUser.id}`)}/>
                </div>
                <strong>{lang === "en" ? "VS" : "対"}</strong>
                <div className="black-player-area profile-area-box">
                    <strong>{blackUser.username}</strong>
                    <img src={blackUser.photoUrl} alt="" onClick={()=>history.push(`/members/${blackUser.id}`)}/>
                </div>
            </div>
            <div className={currentUser.id === blackUser.id ? "elo-area black-elo" : "elo-area white-elo"}>
                <h1>{lang === "en" ? "New Rating:" : "新しいレーティング:"}</h1>
                {updatedUsers && <EloCounter newElo={newElo.rating} prevElo={prevElo.rating} />}
            </div>
        </div>
    ) : null;
}