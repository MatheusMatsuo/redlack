import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { validateEmail } from "../../../utils/validade";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { accessToken, api } from "../../../services/api";

export const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const nome = event.target.nome.value;
    const senha = event.target.senha.value;

    if (!validateEmail(email)) {
      return;
    }

    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };

    api
      .post("/usuarios/usuario-dto", data)
      .then((res) => {
        alert('Usuário cadastrado!',{ buttons: { }});
        navigate("/consult");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
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
            <input type="text" className="has-val input" id="nome" required />
          </div>

          <div className="wrap-input">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="has-val input" id="email" required />
          </div>

          <div className="wrap-input">
            <label htmlFor="senha">Informe sua senha</label>
            <input
              type="password"
              className="has-val input"
              id="senha"
              required
            />
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </LayoutComponents>
    </div>
  );
};
