
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jpIMG from '../../assets/logo.png';
import { LayoutComponents } from '../../components/LayoutComponents';
import { accessToken, api } from '../../services/api';
import Cookies from 'js-cookie';


export const Login = () => {

    const [user, setUser] = useState({ name: "", password: "" });
    const navigate = useNavigate();

    // useEffect(() => {
    //     Cookies.remove("user");
    //   }, []);

    function handleSubmitLogin(event) {
        event.preventDefault();
        if (user.name.length !== 0 && user.password.length !== 3) {
            api.post(`/login`, {
                nome: user.name,
                senha: user.password
            }).then(res => {
                if (res.data) {
                    Cookies.set("user", JSON.stringify(res.data), { path: `/` });
                    //api.defaults.headers.authorization =  accessToken();
                    navigate("/consult");
                }
            })
        }
    }

    
    return (

        <LayoutComponents>
            <form className="login-form" onSubmit={(e) => handleSubmitLogin(e)}>
                <span className="login-form-title">Bem Vindo</span>
                <span className="login-form-title">
                    <img src={jpIMG} alt="Jovem Programador" />
                </span>

                <div className="wrap-input">
                    <input className={user.name !== "" ? 'has-val input' : 'input'} type="text" value={user.name} onChange={(e) => setUser((prevState) => ({ ...prevState, name: e.target.value }))} />
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">
                    <input className={user.password !== "" ? 'has-val input' : 'input'} type="password" value={user.password} onChange={(e) => setUser((prevState) => ({ ...prevState, password: e.target.value }))} />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="container-login-form-btn">
                    <button type='submit' className="login-form-btn">Login</button>
                </div>
            </form>
        </LayoutComponents >

    );
}