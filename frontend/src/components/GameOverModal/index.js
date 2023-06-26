import "./GameOverModal.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function GameOver({game, users}) {
    const lang = useSelector(state=>state.languages.lang);
    const history = useHistory();
    const whiteUser = users[game.white_id];
    const blackUser = users[game.black_id];
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
    return game && users ? (
        <div className={winType === "white" ? "game-over-div" : "game-over-div black-winner-style"}>
            <h1 className><strong>{displayMessage}</strong></h1>
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
            <div className="elo-area">

            </div>
        </div>
    ) : null;
}