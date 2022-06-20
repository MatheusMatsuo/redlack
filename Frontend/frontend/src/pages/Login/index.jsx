
import { useState } from 'react';
import { Link } from 'react-router-dom';
import jpIMG from '../../assets/logo.png';
import { LayoutComponents } from '../../components/LayoutComponents';

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (

        <LayoutComponents>
            <form className="login-form">
                <span className="login-form-title">Bem Vindo</span>
                <span className="login-form-title">
                    <img src={jpIMG} alt="Jovem Programador" />
                </span>

                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input' : 'input'} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={password !== "" ? 'has-val input' : 'input'} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="container-login-form-btn">
                    <Link to="/consult">
                        <button className="login-form-btn">Login</button>
                    </Link>
                </div>
            </form>
        </LayoutComponents>

    );
}