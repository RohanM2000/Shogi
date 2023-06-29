import "./UserShow.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, getUser } from "../../store/users";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getUserGames, fetchUserGames } from "../../store/userGames";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function UserShow () {
    const { memberId } = useParams();
    const user = useSelector(getUser(memberId));
    const users = useSelector(state=>state.users);
    const games = useSelector(getUserGames(memberId));
    const lang = useSelector(state=>state.languages.lang);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUsers());
        dispatch(fetchUserGames(memberId));
    }, [dispatch, memberId]);
    let updatedElo;
    let highestElo;
    if (user) {
        updatedElo = user.elos.sort((eloA, eloB) => {
            return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
        })[0];
        highestElo = user.elos.sort((eloA, eloB) => {
            return Math.sign(eloB.rating - eloA.rating);
        })[0];
    }
    return user && users && games ? (
        <div className="user-show">
            <div className="info-list">
                <img src={user.photoUrl} alt=""/>
                <div className="data-area">
                    <h1>{user.username}</h1>
                    <div className="created-at">
                        <i className="fa-solid fa-chess-pawn" />
                        <h2></h2>
                    </div>
                    <div className="peak-elo">
                        <i className="fa-solid fa-circle-up" />
                        <h2>{highestElo?.rating}</h2>
                    </div>
                    <div className="current-elo">
                        <i className="fa-solid fa-circle-right" />
                        <h2>{updatedElo?.rating}</h2>
                    </div>
                </div>
            </div>
            <ul className="game-list">
                {games.length > 0 && games
                .reverse()
                .map(game=>{
                            return <Link to={`/games/${game.id}`} 
                            className={game.white_id === user.id ? "game-as-white" : "game-as-black"}>
                            {lang === "en" ? "VS" : "対"} {game.white_id === user.id ? users[game.black_id].username : users[game.white_id].username}
                            </Link>})
                            }
            </ul>
        </div>
    ) : null;
}