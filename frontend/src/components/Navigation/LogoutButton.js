import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
export default function LogoutButton () {
    const dispatch = useDispatch();

    return (
        <button onClick={()=> dispatch(logoutUser())}><i className="fa-solid fa-lock"></i><strong>Log Out</strong></button>
    );
};