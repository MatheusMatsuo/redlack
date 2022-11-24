import { useEffect, useState } from "react";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { LayoutConsultColaboradores } from "../../../components/LayoutConsultColaboradores";
import { Link, useNavigate } from "react-router-dom";
import { accessToken, api } from "../../../services/api";
import { LayoutConsultEquipesColab } from "../../../components/LayoutConsultEquipesColab";


export const ConsultEquipesColab = ({ id }) => {
  const [colaboradores, setColaboradores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }if(api.defaults.headers.authorization == null){
      window.location.reload()
    }
  }, []);



  const handleSubmitConsulta = (event) => {
    api.get(`/colaboradores/filtro/idEquipe=${id}`).then((response) => {
      setColaboradores(response.data);
      console.log(response.data);

    });
    event.preventDefault();
  };


  return (
    <div>
      <LayoutMenuNav />
      <div className="wrap-login-consult">
        <span className="login-form-title">Tela de Colaboradores da Equipe </span>
        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleSubmitConsulta}>
            Consultar
          </button>
        </div>
        <Link to={`/equipes/${id}/colaboradores/add`}>
          <div className="container-login-form-btn">
            <button className="login-form-btn" >Adicionar</button>
          </div>
        </Link>

        <div>
          <ul>
          {colaboradores.map((colab) =>
    {
            return <LayoutConsultEquipesColab
                key={colab.id}
                id={colab.id}
                nome={colab.nome}
                email={colab.email}
                idEquipe={id}
              />
    }
)}
          </ul>
        </div>
        <Link to={`/equipes/consult`}>
      <button className="btn-consult btn-consult-voltar">Voltar</button>
      </Link>´
      </div>
    </div>
  );
};