import { LayoutComponents } from "../../components/LayoutComponents";
import jpIMG from '../../assets/logo.png';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";
import { validateEmail } from '../../utils/validade';
import { BASE_URL } from '../../utils/requests';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const Register = () => {

    const navigate = useNavigate();

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

        if (!validateEmail(email)) {
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
            navigate("/consult")
        ));
    };



    return (
        <div>
            <LayoutMenuNav />
            <LayoutComponents>
                <form className="login-form" onSubmit={handleSubmit}>
                    <span className="login-form-title">Cadastrar Usuário</span>
                    <span className="login-form-title">
                        <img src={jpIMG} alt="Jovem Programador" />
                    </span>

                    <div className="wrap-input">
                        <label htmlFor="nome">Informe seu nome</label>
                        <input type="nome" className="has-val input" id="nome" />
                    </div>

                    <div className="wrap-input">
                        <label htmlFor="email">Informe seu email</label>
                        <input type="email" className="has-val input" id="email" />
                    </div>

                    <div className="wrap-input">
                    <label htmlFor="senha">Informe sua senha</label>
                <input type="password" className="has-val input" id="senha" />
                    </div>

                    <div className="container-login-form-btn">
                        <button className="login-form-btn" type='submit'>Cadastrar</button>
                    </div>
                </form>
            </LayoutComponents>
        </div>
    )
}