import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { validateEmail } from "../../../utils/validade";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { accessToken, api } from "../../../services/api";

export const RegisterColaboradores = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }
  }, []);

  const handleSubmit =  (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const nome = event.target.nome.value;
    const cargo = event.target.cargo.value;
    const slack_id = event.target.slack_id.value;
    const redmine_user_id = event.target.redmine_user_id.value;
    const dataNascimento = event.target.dataNascimento.value;

    if (!validateEmail(email)) {
      return;
    }

    const data = {
        nome: nome,
        email: email,
        cargo: cargo,
        slack_id: slack_id,
        redmine_user_id: redmine_user_id,
        dataNascimento: dataNascimento
    };

    console.log(data);

    api
      .post('/colaboradores', data)
      .then(res => (
        navigate('/colaboradores/consult')
      ))
      .catch((err) => {
        alert(err.response.data.message);
    });
  };

  return (
    <div>
      <LayoutMenuNav />
      <LayoutComponents>
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-form-title">Cadastrar Colaboradores</span>
          <span className="login-form-title">
            <img src={jpIMG} alt="Jovem Programador" />
          </span>

          <div className="wrap-input">
            <label htmlFor="nome">Informe seu nome</label>
            <input type="text" className="has-val input" id="nome" required/>
          </div>

          <div className="wrap-input">
            <label htmlFor="email">Informe seu email</label>
            <input type="email" className="has-val input" id="email" required/>
          </div>

          <div className="wrap-input">
            <label htmlFor="cargo">Informe seu cargo</label>
            <input type="text" className="has-val input" id="cargo" required/>
          </div>

          <div className="wrap-input">
            <label htmlFor="slack_id">Informe seu id do Slack</label>
            <input type="text" className="has-val input" id="slack_id" required/>
          </div>

          <div className="wrap-input">
            <label htmlFor="redmine_user_id">Informe seu id do Redmine</label>
            <input type="text" className="has-val input" id="redmine_user_id" required/>
          </div>

          <div className="wrap-input">
            <label htmlFor="dataNascimento">Informe sua data de nascimento</label>
            <input type="text" className="has-val input" id="dataNascimento" placeholder="yyyy-MM-dd" required/>
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
