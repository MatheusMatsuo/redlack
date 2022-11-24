import { Link } from 'react-router-dom';
import { api } from '../../services/api';


export const LayoutConsultAddEquipesColab = ({  nome, email, id, idEquipe }) => {
    
    const handleSubmitAddColab = (event) => {
        api.put(`/equipes/add/idColab=${id}/idEquipe=${idEquipe}`).then((response) => {
        });
        event.preventDefault();
        window.location.reload()
      };

  return (
    <div className="Item-container">
      <li className="Item-field">
        Codigo: {id} <br></br>
        Nome: {nome} <br></br>
        Email: {email}
    </li>
      <button className="btn-consult btn-consult-removeColabEq" onClick={handleSubmitAddColab}> Adicionar</button>
    </div>
  );
};