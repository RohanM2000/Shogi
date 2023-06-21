import { useState } from "react";
import { createUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { receiveModal } from "../../store/modals";
import "./SignupFormPage.css";
const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirm, setSeeConfirm] = useState(false);
    const lang = useSelector(state=>state.languages.lang);
    if (sessionUser) return <Redirect to="/" />;

    function handlePasswordToggle(e) {
        setSeePassword(state => !state);
    }

    function handleConfirmToggle(e) {
        setSeeConfirm(state => !state);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        if (password === confirmPassword){
            return dispatch(createUser({email, username, password})).catch(async (res) => {
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
        }
        return setErrors(['Confirm password field must match password field']);
        // dispatch(loginUser(credential, password));
        // setCredential("");
        // setPassword("");
    }
    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-area">
                {errors.length > 0 && <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>}
                <div className="input-field">
                    <strong>
                        <i className="fa-solid fa-user"></i>
                    </strong>
                    <input type="text" className="credential-field" value={username} onChange={(e)=> setUsername(e.target.value)} required placeholder={lang === "en" ? "Username" : "ユーザー名"}/>
                </div>
                <div className="input-field">
                    <strong>
                        <i className="fa-solid fa-envelope"></i>
                    </strong>
                    <input type="text" className="credential-field" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder={lang === "en" ? "Email" : "Eメール"}/>
                </div>
                <div className="input-field">
                    <strong>
                        <i className="fa-solid fa-lock"></i>
                    </strong>
                        <input type={(seePassword) ? "text" : "password"} value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder={lang === "en" ? "Password" : "パスワード"}/>
                    <strong onClick={handlePasswordToggle} className="eye">
                        {(seePassword) ? <i className="fa-solid fa-eye-slash" id="slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </strong>
                </div>
                <div className="input-field">
                    <strong>
                        <i className="fa-solid fa-lock"></i>
                    </strong>
                        <input type={(seeConfirm) ? "text" : "password"} value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required placeholder={lang === "en" ? "Confirm Password" : "パスワードの確認"}/>
                    <strong onClick={handleConfirmToggle} className="eye">
                        {(seeConfirm) ? <i className="fa-solid fa-eye-slash" id="slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </strong>
                </div>
            </div>
            <button>{lang === "en" ? "Sign Up" : "サインアップ"}</button>
            <div className="or-separator">
                <span className="span-line"/>
                <span className="or-value">{lang === "en" ? "OR" : "または"}</span>
                <span className="span-line"/>
            </div>
            <div className="redirect-sign-method" onClick={(e)=>{
                e.preventDefault();
                dispatch(receiveModal("login"));
              }}>
                <span>Already have an account?</span>
                <span className="link-method">Log In</span>
            </div>
        </form>
    );
};

export default SignupForm;