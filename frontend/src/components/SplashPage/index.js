import "./SplashPage.scss";
import { useSelector } from "react-redux";
export default function SplashPage () {
    const lang = useSelector(state=>state.languages.lang)
    return (
    <div className="splash-page">
        <div>
        </div>
    </div>
    );
}