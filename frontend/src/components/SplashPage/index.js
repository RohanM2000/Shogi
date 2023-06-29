import "./SplashPage.scss";
import { useSelector } from "react-redux";
export default function SplashPage () {
    const lang = useSelector(state=>state.languages.lang)
    return (
    <div className="splash-page">
        <img src={``} alt=""/>
        
        <div className="explanation-area">
            <p>
                {lang === "en" ?
                "Welcome to Shogi.com, the world's leading shogi site! To test out the functionality of online play by yourself, log into a demo user on a browser, then simply open another (or the same!) browser in private/incognito mode to login as another user." :
                "ようこそShogi.comへ！このサイトは世界一のオンラインの将棋できるサイトです。1人ですか？ここでログイン後でシ-クレットウィンドウに他のユ-ザ-でログインしてください。"}
            </p>
        </div>
    </div>
    );
}