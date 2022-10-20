import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, accessToken } from "../../../services/api";

export const SaveEditEquipes = ({ id }) => {
  const navigate = useNavigate();

  const [equipes, setEquipes] = useState();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }

    if (id != null) {
      api.get(`/equipes/${id}`).then((response) => {
        setEquipes(response.data);
        console.log(response);
      });
    } 
  }, []);

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const canal_id = event.target.canal_id.value;
    const enumTipoEquipe = event.target.enumTipoEquipe.value;
    var data;

      data = {
        id: id,
        nome: nome,
        enumTipoEquipe: enumTipoEquipe,
        canal_id: canal_id,
        collectionColaborador: []
      };
    
    console.log(data);
    api
      .post(`/equipes`, data)
      .then((res) => navigate("/equipes/consult"))
      .catch((err) => console.log(err.message));
  };

  const handleSubmitDelet = (event) => {
    event.preventDefault();

    api
      .delete(`/equipes/${id}`)
      .then((res) => navigate("/equipes/consult"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <LayoutMenuNav />
      <LayoutComponents>
        <form className="login-form" onSubmit={handleSubmitUpdate}>
          <span className="login-form-title">Salvar Equipe</span>
          <span className="login-form-title">
            <img src={jpIMG} alt="Jovem Programador" />
          </span>

          <div className="wrap-input">
            <label htmlFor="nome">Informe o nome da equipe</label>
            <input
              type="text"
              className="has-val input"
              id="nome"
              value={equipes?.nome}
              onChange={() => setEquipes().nome}
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="enumTipoEquipe">Informe o tipo da equipe</label>

            <select className="has-val input" id="enumTipoEquipe" value={equipes?.enumTipoEquipe}
             onChange={() => setEquipes().enumTipoEquipe}>
              <option value="BACKEND">Backend</option>
              <option value="FRONTEND">Frontend</option>
              <option value="TESTER">Tester</option>
            </select>
          </div>

          <div className="wrap-input">
            <label htmlFor="nome">Informe o id do canal da equipe</label>
            <input
              type="text"
              className="has-val input"
              id="canal_id"
              value={equipes?.canal_id}
              onChange={() => setEquipes().canal_id}
            />
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Salvar
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
