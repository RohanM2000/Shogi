import "./UserShow.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getUser } from "../../store/users";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getUserGames, fetchUserGames } from "../../store/userGames";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function UserShow () {
    const { memberId } = useParams();
    const user = useSelector(getUser(memberId));
    const games = useSelector(getUserGames(memberId));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUser(memberId)).then(()=>dispatch(fetchUserGames(memberId)));
    }, [dispatch, memberId]);

    return user ? (
        <>
            <h1>{user.username}</h1>
            {console.log(games)}
            {games.length > 0 && games.map(game=><Link to={`/games/${game.id}`}>{game.status}</Link>)}
        </>
    ) : null;
}