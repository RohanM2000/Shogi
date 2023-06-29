import { useState } from "react";
import { loginUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { receiveModal } from "../../store/modals";
import "./LoginFormPage.css";
const LoginForm = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [seePassword, setSeePassword] = useState(false);
    const lang = useSelector(state=>state.languages.lang);
    // if (sessionUser) return <Redirect to="/" />;
    function handleToggle(e) {
      setSeePassword(state => !state);
    };
    function handleDemoOne(e) {
      e.preventDefault();
      return dispatch(loginUser({credential: "pig lover", password: "password"})).catch(()=>setErrors(["Cannot demo login at this time"]));
    }
    function handleDemoTwo(e) {
      e.preventDefault();
      return dispatch(loginUser({credential: "orca lover", password: "password"})).catch(()=>setErrors(["Cannot demo login at this time"]));
    }
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        return dispatch(loginUser({credential, password})).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
        // dispatch(loginUser(credential, password));
        // setCredential("");
        // setPassword("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input-area">
              {errors.length > 0 && <ul>
                  {errors.map(error => <li key={error}>{error}</li>)}
              </ul>}
              <div className="input-field">
                <strong>
                  <i className="fa-solid fa-user"></i>
                </strong>
                <input type="text" className="credential-field" value={credential} onChange={(e)=> setCredential(e.target.value)} required placeholder={lang === "en" ? "Username or Email": "ユーザー名またはEメール"}/>
              </div>
              <div className="input-field">
                <strong>
                  <i className="fa-solid fa-lock"></i>
                </strong>
                <input type={(seePassword) ? "text" : "password"} value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder={lang === "en" ? "Password" : "パスワード"}/>
                <strong onClick={handleToggle} className="eye">
                {(seePassword) ? <i className="fa-solid fa-eye-slash" id="slash"></i> : <i className="fa-solid fa-eye"></i>}
                </strong>
              </div>
            </div>
            <button>{lang === "en" ? "Log In" : "ログイン"}</button>
            <div className="or-separator">
              <span className="span-line"/>
              <span className="or-value">{lang === "en" ? "OR" : "または"}</span>
              <span className="span-line"/>
            </div>
            <button className="demo-1" onClick={handleDemoOne}>{lang === "en" ? "Demo 1" : "デモ1"}</button>
            <button className="demo-2" onClick={handleDemoTwo}>{lang === "en" ? "Demo 2" : "デモ2"}</button>
            <div className="redirect-sign-method" onClick={(e)=>{
                e.preventDefault();
                dispatch(receiveModal("signup"));
              }}>
              <span>New? </span>
              <span className="link-method">Sign up - and start playing shogi!</span>
            </div>
        </form>
    );
};

export default LoginForm;