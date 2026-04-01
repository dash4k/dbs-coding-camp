import React from "react";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
    const locale = React.useContext(LocaleContext);

    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const onLogin = async (e) => {
        e.preventDefault();
        
        if (email === '' || password === '') return;
        
        const { error, data } = await login({ email, password });

        if (!error) loginSuccess(data);
    }

    return (
        <section className="login-page">
            <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
            <form className="input-login" onSubmit={onLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={setEmail} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={setPassword} />
                <button type="submit">Login</button>
            </form>
            <p>{locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"} <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link></p>
        </section>
    )
}

export default LoginPage;
