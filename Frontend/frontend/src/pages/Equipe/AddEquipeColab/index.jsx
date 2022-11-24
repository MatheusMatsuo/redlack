import { useEffect, useState } from "react";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { Link, useNavigate } from "react-router-dom";
import { accessToken, api } from "../../../services/api";
import { LayoutConsultAddEquipesColab } from "../../../components/LayoutConsultAddEquipesColab";


export const AddEquipeColab = ({ id }) => {
  const [colaboradores, setColaboradores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }if(api.defaults.headers.authorization == null){
      window.location.reload()
    }
    api.get(`/colaboradores/filtro/semEquipe`).then((response) => {
        setColaboradores(response.data);
        console.log(response.data);
        console.log("id" + id);
  
      });
  }, []);

  return (
    <div>
      <LayoutMenuNav />
      <div className="wrap-login-consult">
        <span className="login-form-title">Tela de Colaboradores sem Equipe</span>

        <div>
          <ul>
          {colaboradores.map((colab) =>
    {
            return <LayoutConsultAddEquipesColab
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
        <Link to={`/equipes/${id}/colaboradores`}>
      <button className="btn-consult btn-consult-voltar">Voltar</button>
      </Link>´
      </div>
    </div>
  );
};