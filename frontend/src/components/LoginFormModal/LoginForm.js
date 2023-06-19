import { useState } from "react";
import { loginUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { receiveModal } from "../../store/modals";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginFormPage.css";
const LoginForm = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [seePassword, setSeePassword] = useState(false);

    // if (sessionUser) return <Redirect to="/" />;
    function handleToggle(e) {
      setSeePassword(state => !state);
    };

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
                <input type="text" className="credential-field" value={credential} onChange={(e)=> setCredential(e.target.value)} required placeholder="Username or Email"/>
              </div>
              <div className="input-field">
                <strong>
                  <i className="fa-solid fa-lock"></i>
                </strong>
                <input type={(seePassword) ? "text" : "password"} value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Password"/>
                <strong onClick={handleToggle} className="eye">
                {(seePassword) ? <i className="fa-solid fa-eye-slash" id="slash"></i> : <i className="fa-solid fa-eye"></i>}
                </strong>
              </div>
            </div>
            <button>Log In</button>
            <div className="or-separator">
              <span className="span-line"/>
              <span className="or-value">OR</span>
              <span className="span-line"/>
            </div>
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