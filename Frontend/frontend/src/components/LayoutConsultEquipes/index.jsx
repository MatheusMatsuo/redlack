import React from 'react';
import { Link } from "react-router-dom";


export const LayoutConsultEquipes = ({  nome, enumTipoEquipe, id, canal_id }) => {
  return (
    <div className="Item-container">
      <li className="Item-field">
        Codigo: {id} <br></br>
        Nome: {nome} <br></br>
         Tipo: {enumTipoEquipe} <br></br>
         Canal id: {canal_id} <br></br>
    </li>
    <div>
        <Link to={`/equipes/saveEdit/${id}`}>
      <button className="btn-consult btn-consult-equipe">Ações</button>
      </Link>´

      <Link to={`/equipes/${id}/colaboradores`}>
      <button className="btn-consult btn-consult-equipe">Colab</button>
      </Link>´
      </div>
    </div>
  );
};