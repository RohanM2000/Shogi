import "./SplashPage.scss";
import { useSelector } from "react-redux";
export default function SplashPage () {
    const lang = useSelector(state=>state.languages.lang)
    return (
    <div className="splash-page">
        <img src={`https://shogi-seeds.s3.us-west-1.amazonaws.com/shogi_splash.png`} alt=""/>
        
        <div className="explanation-area">
            <h1> {lang === "en" ? "Welcome to Shogi.com, the world's leading shogi site!" : "ようこそShogi.comへ！このサイトは世界一のオンラインの将棋できるサイトです。"}</h1>
            <p>
                {lang === "en" ?
                "To test out the functionality of online play by yourself, log into a demo user on a browser, then simply open another (or the same!) browser in private/incognito mode to login as another user." :
                "1人ですか？ここでログイン後でシ-クレットウィンドウに他のユ-ザ-でログインしてください。"}
            </p>
        </div>
    </div>
    );
}