import { LayoutComponents } from "../../components/LayoutComponents";
import { useState, useEffect, FormEvent }  from 'react';
import jpIMG from '../../assets/celta.png';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";
import { validateEmail } from '../../utils/validade';
import { BASE_URL } from '../../utils/requests';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


export const Register = () =>{

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    
/*
const [usuario, setUsuario] = useState();
    useEffect(() => {
        axios.get(`${BASE_URL}/usuarios`)
            .then(response => {
                setUsuario(response.data);
            });
    },);
    */

    const handleSubmit = (event) => {

        event.preventDefault();

        const email = (event.target).email.value;
        const nome = (event.target).nome.value;
        const senha = (event.target).senha.value;

        if(!validateEmail(email)){
            return;
        }

        const config = {
            baseURL: BASE_URL,
            method: 'POST',
            url: '/usuarios',
            data: {
                nome: nome,
                email: email,
                senha: senha

            }
        }

          axios(config).then(response => ( 
            navigate("/")
        ));
    };
    


    return(
        <div>
        <LayoutMenuNav/>
        <LayoutComponents>
             <form className="login-form" onSubmit={handleSubmit}>
                <span className="login-form-title">Cadastrar Usuário</span>
                <span className="login-form-title">
                    <img  src={jpIMG} alt="Jovem Programador" />
                </span>

               <div className="wrap-input">
                    <input className={nome !== "" ? 'has-val input' : 'input'} type="nome" value={nome}  onChange={e => setNome(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input' : 'input'} type="email" value={email}  onChange={e => setEmail(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={senha !== "" ? 'has-val input' : 'input'} type="senha" value={senha}  onChange={e => setSenha(e.target.value)}/>
                    <span className="focus-input" data-placeholder="Senha"></span>
                </div>

                <div className="container-login-form-btn">
                    <button className="login-form-btn"  type='submit'>Cadastrar</button>
                </div>
            </form>
        </LayoutComponents>
        </div>
    )
}