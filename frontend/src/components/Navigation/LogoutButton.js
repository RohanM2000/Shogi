import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { useSelector } from "react-redux";
export default function LogoutButton () {
    const dispatch = useDispatch();
    const lang = useSelector(state=>state.languages.lang);
    return (
        <button onClick={()=> dispatch(logoutUser())}><i className="fa-solid fa-lock"></i><strong>{lang === "en" ? "Log Out" : "ログアウト"}</strong></button>
    );
};