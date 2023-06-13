import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
export function ProfileButton () {
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!showMenu) return;

        function closeMenu() {
            setShowMenu(false);
        }

        document.addEventListener("click", closeMenu)

        return ()=> document.removeEventListener("click", closeMenu);
    },[showMenu]);


    return (
        <>
            <div style={{ color: "orange", fontSize: "100px" }}>
                <i className="fa-solid fa-carrot" onClick={()=> setShowMenu(priorState => !priorState)}></i>
            </div>
            {showMenu && (
                <ul>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li><button onClick={()=> dispatch(logoutUser())}>Sign Out</button></li>
                </ul>
            )}
        </>
  );
};