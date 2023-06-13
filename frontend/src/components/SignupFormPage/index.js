import { useState } from "react";
import { createUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupFormPage.css";
const SignupFormPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/" />;

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
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required/>
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            <input type="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required/>
            <button>Sign Up</button>
        </form>
    );
};

export default SignupFormPage;