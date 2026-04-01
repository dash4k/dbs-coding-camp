import React from "react";
import useInput from "../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
    const locale = React.useContext(LocaleContext);
    
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [name, setName] = useInput('');
    const [confirmPassword, setConfirmPassword] = useInput('');

    const navigate = useNavigate();
    
    const onRegister = async (e) => {
        e.preventDefault();

        if (email === '' || password === '' || name === '' || confirmPassword === '') return;
        if (password !== confirmPassword) {
            alert(locale === 'id' ? 'Konfirmasi Password harus sama dengan Password!' : 'Confirm Password must match Password!');
            return;
        }

        const { error } = await register({ name, email, password });

        if (!error) {
            alert(locale === id ? 'Registrasi berhasil, silahkan login' : 'Registration');
            navigate('/');
        }
    }

    return (
        <section className="register-page">
            <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>
            <form onSubmit={onRegister} className="input-register">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={setName} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={setEmail} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={setPassword} />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" id="confirmpassword" value={confirmPassword} onChange={setConfirmPassword} />
                <button type="submit">Register</button>
            </form>
            <p>{locale === 'id' ? 'Sudah punya akun?' : "Already have an account?"} <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link></p>
        </section>
    )
}

export default RegisterPage;
