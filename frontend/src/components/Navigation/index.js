// import { ProfileButton } from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import {swapLanguage} from "../../store/languages";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
// import { logoutUser } from "../../store/session";
import "./Navigation.scss";
const Navigation = () => {
    const user = useSelector(state=> state.session.user);
    const lang = useSelector(state=> state.languages.lang);
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");
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
                    <li>
                        <Link to="/play/1">
                                <button className="play-button">
                                    <i className="fa-solid fa-hand-point-left"></i><strong>{lang === "en" ? "Play": "プレイ"}</strong>
                                </button>
                                    {user && <ul className="hidden-logout">
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            history.push("/play/1");
                                        }}><i className="fa-solid fa-clock"/><strong>{lang === "en" ? "Rapid" : "ラピッド"}</strong></button>
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            history.push("/play/2");
                                        }}><i className="fa-solid fa-bolt"/><strong>{lang === "en" ? "Blitz" : "ブリッツ"}</strong></button>
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            history.push("/play/3");
                                        }}><i className="fa-solid fa-gauge"/><strong>{lang === "en" ? "Bullet" : "ブレット"}</strong></button>
                                        
                                    </ul>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/leaderboard">
                                <button className="leaderboard">
                                    <i className="fa-solid fa-medal"></i><strong>{lang === "en" ? "Leaderboard": "ランキング"}</strong>
                                </button>
                        </Link>
                    </li>
                    <li>
                        <form className="search-form" onSubmit={(e)=>{
                            e.preventDefault();
                            history.push(`/search/${searchQuery}`);
                        }}>
                            <input type="text" 
                            className="search-input" 
                            placeholder={lang === "en" ? "Search" : "検索"} 
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
                            />
                        </form>
                    </li>
                </ul>
                )
    }
    return lang ? (
        <div className="nav-bar">
            <div className="top-link-holder">
                <NavLink exact to="/">
                    <i className="fa-solid fa-chess-pawn"></i><strong className="bold-shogi">Shogi</strong><strong>.com</strong>
                    {user && <ul className="hidden-logout">
                        <ProfileButton />
                        <LogoutButton />
                    </ul>}
                </NavLink>
            {links}
            </div>
            <div className="language-links">
                <button onClick={()=>swapLanguage(dispatch)}><i className="fa-solid fa-earth-asia"></i><strong>{lang === "en" ? "English" : "日本語"}</strong></button>
            </div>
        </div>
    ) : null;
};

export default Navigation;