import { useEffect, useState } from "react";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { LayoutConsultEquipes } from "../../../components/LayoutConsultEquipes";
import { Link, useNavigate } from "react-router-dom";
import { accessToken, api } from "../../../services/api";

export const ConsultEquipes = () => {
  const [equipes, setEquipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }if(api.defaults.headers.authorization == null){
      window.location.reload()
    }
  }, []);



  const handleSubmitConsulta = (event) => {
    api.get("/equipes").then((response) => {
      setEquipes(response.data);
    });

    event.preventDefault();
  };

  return (
    <div>
      <LayoutMenuNav />
      <div className="wrap-login-consult">
        <span className="login-form-title">Consulta de Equipes</span>
        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleSubmitConsulta}>
            Consultar
          </button>
        </div>
        <Link to="/equipes/saveEdit">
          <div className="container-login-form-btn">
            <button className="login-form-btn">Cadastrar</button>
          </div>
        </Link>

        <div>
          <ul>
            {equipes.map((eq) => (
              <LayoutConsultEquipes
                key={eq.id}
                nome={eq.nome}
                enumTipoEquipe={eq.enumTipoEquipe}
                id={eq.id}
                canal_id={eq.canal_id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
