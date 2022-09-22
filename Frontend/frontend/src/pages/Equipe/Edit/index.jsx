import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { validateEmail } from "../../../utils/validade";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, accessToken } from "../../../services/api";

export const EditEquipes = ({ id }) => {
  const navigate = useNavigate();

  const [equipes, setEquipes] = useState();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }
    api.get(`/equipes/${id}`).then((response) => {
      setEquipes(response.data);
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
      dataNascimento: dataNascimento,
    };

    api
      .put(`/equipes/${id}`, data)
      .then((res) => navigate("/equipes/consult"))
      .catch((err) => console.log(err.message));
  };

  const handleSubmitDelet = (event) => {
    event.preventDefault();

    api
      .delete(`/equipes/${id}`)
      .then((res) => navigate("/equipes/consult"))
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
              value={equipes?.nome}
              onChange={() => setEquipes().nome}
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="email">Informe o tipo da equipe</label>

            <label for="BACKEND">Backend:</label>
            <input type="checkbox" id="BACKEND" value="BACKEND" />
            <label for="FRONTEND">Frontend:</label>
            <input type="checkbox" id="FRONTEND" value="FRONTEND" />
            <label for="TESTER">Tester:</label>
            <input type="checkbox" id="TESTER" value="TESTER" />
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
