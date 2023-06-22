import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/users";
import { fetchUsers } from "../../store/users";
export default function UserIndex () {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);
    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch]);

    return users ? (
        <>
            <ul>
                {users.map((user)=><img src={user.photoUrl} alt=""/>)}
            </ul>
        </>
    ) : null;
}