import { useEffect, useState } from "react";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { LayoutConsultColaboradores } from "../../../components/LayoutConsultColaboradores";
import { Link, useNavigate } from "react-router-dom";
import { accessToken, api } from "../../../services/api";


export const ConsultColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(api.defaults);
    if (accessToken() == null) {
      navigate("/login");
    }
    if(api.defaults.headers.authorization == null){
      window.location.reload()
    }
  }, []);



  const handleSubmitConsulta = (event) => {
    api.get("/colaboradores").then((response) => {
      setColaboradores(response.data);
    });
    event.preventDefault();
  };


  return (
    <div>
      <LayoutMenuNav />
      <div className="wrap-login-consult">
        <span className="login-form-title">Consulta de Colaboradores</span>
        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleSubmitConsulta}>
            Consultar
          </button>
        </div>
        <Link to="/colaboradores/register">
          <div className="container-login-form-btn">
            <button className="login-form-btn">Cadastrar</button>
          </div>
        </Link>

        <div>
          <ul>
          {colaboradores.map((colab) =>
    {
        if(colab.equipe == null){
            return <LayoutConsultColaboradores
                key={colab.id}
                id={colab.id}
                nome={colab.nome}
                cargo= {colab.cargo}
                email={colab.email}
                dataNascimento={colab.dataNascimento}
                slack_id={colab.slack_id}
                redmine_user_id={colab.redmine_user_id}
              />
        } else{
            return <LayoutConsultColaboradores
                key={colab.id}
                id={colab.id}
                nome={colab.nome}
                cargo= {colab.cargo}
                email={colab.email}
                dataNascimento={colab.dataNascimento}
                slack_id={colab.slack_id}
                redmine_user_id={colab.redmine_user_id}
                nomeEquipe={colab.equipe.nome}
              />
        }
    }
)}
          </ul>
        </div>
      </div>
    </div>
  );
};
