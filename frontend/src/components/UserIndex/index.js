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

    return users ? (
        <>
            <ul className="user-list">
                {users.map((user)=>{return (
                    <li key={user.id}>
                        <img src={user.photoUrl} alt="" className="user-photo-index"/>
                        <Link to={`/members/${user.id}`}>
                            <strong>{user.username}</strong>
                        </Link>
                    </li>
                )})}
            </ul>
        </>
    ) : null;
}