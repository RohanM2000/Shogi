import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser } from "../../store/users";
import { getUser } from "../../store/users";
import { useEffect } from "react";
export default function ProfileButton () {
    const history = useHistory();
    const lang = useSelector(state=>state.languages.lang);
    const user = useSelector(state=>state.session.user);
    const curUser = useSelector(getUser(user.id));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUser(user.id));
    },[dispatch])
    return (
        <button onClick={(e)=>{
            e.preventDefault();
            history.push("/profile");
        }}><img src={curUser ? curUser.photoUrl : null} alt=""/><strong>{lang === "en" ? "Profile" : "プロフィール"}</strong></button>
    );
};