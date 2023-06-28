import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/users";
import { fetchUsers } from "../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./UserIndex.scss";
export default function UserIndex () {
    const { searchQuery } = useParams();
    const dispatch = useDispatch();
    const users = useSelector(getUsers);
    useEffect(()=>{
        dispatch(fetchUsers(searchQuery));
    },[dispatch, searchQuery]);
    const sortedUsers = Object.values(users)
    .sort((userA, userB)=> {
        const eloA = userA.elos.sort((eloA, eloB) => {
            return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
            })[0];
        const ratingA = eloA ? eloA.rating : 0;
        const eloB = userB.elos.sort((eloA, eloB) => {
            return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
            })[0];
        const ratingB = eloB ? eloB.rating : 0;
        return Math.sign(ratingB - ratingA);
    });

    return users ? (
        <>
            <ul className="user-list">
                {sortedUsers
                .map((user)=>{return (
                    <li key={user.id}>
                        <img src={user.photoUrl} alt="" className="user-photo-index"/>
                        <Link to={`/members/${user.id}`}>
                            <strong>{user.username}</strong>
                            <strong>
                                ({user.elos.sort((eloA, eloB) => {
                                return Math.sign(new Date(eloB.createdAt).getTime() - new Date(eloA.createdAt).getTime());
                                })[0]?.rating})
                            </strong>
                        </Link>
                    </li>
                )})}
            </ul>
        </>
    ) : null;
}