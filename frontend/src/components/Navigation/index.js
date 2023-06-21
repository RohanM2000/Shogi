import { ProfileButton } from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LogoutButton from "./LogoutButton";
// import { logoutUser } from "../../store/session";
import "./Navigation.scss";
const Navigation = () => {
    const user = useSelector(state=> state.session.user);
    // const dispatch = useDispatch();
    let links;

    if (!user) {
        links = (<div className="login-buttons">
            <SignupFormModal />
            <LoginFormModal />
            {/* <NavLink exact to="/signup">Sign Up</NavLink> */}
        </div>)
    } else {
        // links = <button onClick={()=>dispatch(logoutUser())}>Sign Out</button>
        // links = <ProfileButton />
        links = (
                <ul className="actions-list-nav-bar">
                    <Link to="/play">
                            <button className="play-button">
                                <i className="fa-solid fa-hand-point-left"></i><strong>Play</strong>
                            </button>
                    </Link>
                </ul>
                )
    }
    return (
        <div className="nav-bar">
            <NavLink exact to="/">
                <i className="fa-solid fa-chess-pawn"></i><strong className="bold-shogi">Shogi</strong><strong>.com</strong>
                {user && <ul className="hidden-logout">
                    <LogoutButton />
                </ul>}
            </NavLink>
            {links}
        </div>
    )
};

export default Navigation;