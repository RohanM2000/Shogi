import "./UserShow.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, getUser, getUsers } from "../../store/users";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getUserGames, fetchUserGames } from "../../store/userGames";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function UserShow () {
    const { memberId } = useParams();
    const user = useSelector(getUser(memberId));
    const users = useSelector(getUsers);
    const games = useSelector(getUserGames(memberId));
    const lang = useSelector(state=>state.languages.lang);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUsers()).then(()=>dispatch(fetchUserGames(memberId)));
    }, [dispatch, memberId]);
    const updatedElo = user?.elos.sort((eloA, eloB) => {
        return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
        })[0];
    const highestElo = user?.elos.sort((eloA, eloB) => {
        return Math.sign(eloB.rating - eloA.rating);
        })[0];
    return user && users? (
        <div className="user-show">
            <h1>{user.username}</h1>
            <ul className="game-list">
                {games.length > 0 && games.reverse().map(game=><Link to={`/games/${game.id}`} className={game.white_id === user.id ? "game-as-white" : "game-as-black"}>{lang === "en" ? "VS" : "対"} {game.white_id === user.id ? users[game.black_id].username : users[game.white_id].username}</Link>)}
            </ul>
        </div>
    ) : null;
}