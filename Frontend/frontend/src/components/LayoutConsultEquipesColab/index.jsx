import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { api } from '../../services/api';


export const LayoutConsultEquipesColab = ({  nome, email, id, idEquipe }) => {
    
    const handleSubmitRemoveColab = (event) => {
        api.put(`/equipes/remove/idColab=${id}/idEquipe=${idEquipe}`).then((response) => {
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
      <button className="btn-consult" onClick={handleSubmitRemoveColab}> Remover</button>
    </div>
  );
};