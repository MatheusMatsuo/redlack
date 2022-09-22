import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { validateEmail } from "../../../utils/validade";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, accessToken } from "../../../services/api";

export const EditColaboradores = ({ id }) => {
  const navigate = useNavigate();

  const [colaboradores, setColaboradores] = useState();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }
    api.get(`/colaboradores/${id}`).then((response) => {
      setColaboradores(response.data);
    });
  }, [id]);

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const nome = event.target.nome.value;
    const cargo = event.target.cargo.value;
    const dataNascimento = event.target.dataNascimento.value;

    if (!validateEmail(email)) {
      return;
    }

    const data = {
        nome: nome,
        email: email,
        cargo: cargo,
        dataNascimento: dataNascimento
    };

    api
      .put(`/colaboradores/${id}`, data)
      .then(res => (
        navigate('/colaboradores/consult')
      ))
      .catch((err) => console.log(err.message));
  };

  const handleSubmitDelet = (event) => {
    event.preventDefault();

    api
    .delete(`/colaboradores/${id}`)
    .then(res => (
      navigate('/colaboradores/consult')
    ))
    .catch((err) => console.log(err.message));
    console.log(api.defaults);
};

  return (
    <div>
      <LayoutMenuNav />
      <LayoutComponents>
        <form className="login-form" onSubmit={handleSubmitUpdate}>
          <span className="login-form-title">Editar Colaborador</span>
          <span className="login-form-title">
            <img src={jpIMG} alt="Jovem Programador" />
          </span>

          <div className="wrap-input">
            <label htmlFor="nome">Informe seu nome</label>
            <input
              type="nome"
              className="has-val input"
              id="nome"
              value={colaboradores?.nome}
              onChange={() => setColaboradores().nome}
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="email">Informe seu email</label>
            <input
              type="email"
              className="has-val input"
              id="email"
              value={colaboradores?.email}
              onChange={() => setColaboradores().nome}
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="cargo">Informe seu cargo</label>
            <input
              type="text"
              className="has-val input"
              id="cargo"
              value={colaboradores?.senha}
              onChange={() => setColaboradores().nome}
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="dataNascimento">Informe sua data de nascimento</label>
            <input
              type="text"
              className="has-val input"
              id="dataNascimento"
              value={colaboradores?.senha}
              onChange={() => setColaboradores().nome}
            />
          </div>
          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Editar
            </button>
          </div>
          <div className="container-login-form-btn">
            <button className="login-form-btn" onClick={handleSubmitDelet}>
              Deletar
            </button>
          </div>
        </form>
      </LayoutComponents>
    </div>
  );
};
