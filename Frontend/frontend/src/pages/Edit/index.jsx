import { LayoutComponents } from "../../components/LayoutComponents";
import jpIMG from '../../assets/logo.png';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";
import { validateEmail } from '../../utils/validade';
import { BASE_URL } from '../../utils/requests';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';



export const Edit = ({id}) =>{
    
    const navigate = useNavigate();

    
    const [usuario, setUsuario] = useState();

        useEffect(() => {
            axios.get(`${BASE_URL}/usuarios/${id}`)
                .then(response => {
                    setUsuario(response.data);
                });
        },[id]);
        

    const handleSubmit = (event) => {

        event.preventDefault();

        const email = (event.target).email.value;
        const nome = (event.target).nome.value;
        const senha = (event.target).senha.value;

        if (!validateEmail(email)) {
            return;
        }

        const config = {
            baseURL: BASE_URL,
            method: 'PUT',
            url: `/usuarios/editar/${id}`,
            data: {
                nome: nome,
                email: email,
                senha: senha

            }
        }

        axios(config).then(response => (
            navigate("/consult")
        ));
    };

    const handleSubmitDelet = (event) => {

        event.preventDefault();

        const config = {
            baseURL: BASE_URL,
            method: 'DELETE',
            url: `/usuarios/deletar/${id}`,
        }

        axios(config).then(response => (
            navigate("/consult")
        ));
    };
    
    return (
        <div>
            <LayoutMenuNav />
            <LayoutComponents>
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title">Editar Usuário</span>
                    <span className="login-form-title">
                        <img src={jpIMG} alt="Jovem Programador" />
                    </span>

                    <div className="wrap-input">
                        <label htmlFor="nome">Informe seu nome</label>
                        <input type="nome" className="has-val input" id="nome" value={usuario?.nome} onChange={() => setUsuario().nome}/>
                    </div>

                    <div className="wrap-input">
                        <label htmlFor="email">Informe seu email</label>
                        <input type="email" className="has-val input" id="email" value={usuario?.email} onChange={() => setUsuario().nome}/>
                    </div>

                    <div className="wrap-input">
                    <label htmlFor="senha">Informe sua senha</label>
                <input type="password" className="has-val input" id="senha" value={usuario?.senha} onChange={() => setUsuario().nome} />
                    </div>

                    <div className="container-login-form-btn">
                        <button className="login-form-btn" type='submit'>Editar</button>
                    </div>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn" onClick={handleSubmitDelet}>Deletar</button>
                    </div>
                </form>
            </LayoutComponents>
        </div>
    )
}