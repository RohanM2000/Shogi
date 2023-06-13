import { useState } from "react";
import { loginUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginFormPage.css";
const LoginFormPage = () => {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/" />;

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        return dispatch(loginUser(credential, password)).catch(async (res) => {
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
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input type="text" value={credential} onChange={(e)=> setCredential(e.target.value)} required/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            <button>Log In</button>
        </form>
    );
};

export default LoginFormPage;