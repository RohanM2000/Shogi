import { ProfileButton } from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import { logoutUser } from "../../store/session";
import "./Navigation.css";
const Navigation = () => {
    const user = useSelector(state=> state.session.user);
    // const dispatch = useDispatch();
    let links;

    if (!user) {
        links = (<>
            <LoginFormModal />
            {/* <NavLink exact to="/signup">Sign Up</NavLink> */}
            <SignupFormModal />
        </>)
    } else {
        // links = <button onClick={()=>dispatch(logoutUser())}>Sign Out</button>
        links = <ProfileButton />
    }
    return (
        <>
            <NavLink exact to="/">Home</NavLink>
            {links}
        </>
    )
};

export default Navigation;