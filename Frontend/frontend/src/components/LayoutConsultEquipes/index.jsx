import React from 'react';
import { Link } from "react-router-dom";


export const LayoutConsultEquipes = ({  nome, enumTipoEquipe, id }) => {
  return (
    <div className="Item-container">
      <li className="Item-field">
        Codigo: {id} <br></br>
        Nome: {nome} <br></br>
         Tipo: {enumTipoEquipe} <br></br>
    </li>
        <Link to={`/equipes/saveEdit/${id}`}>
      <button className="btn-consult">Editar</button>
      </Link>´

      <Link to={`/equipes/${id}/colaboradores`}>
      <button className="btn-consult">Colaboradores</button>
      </Link>´
    </div>
  );
};