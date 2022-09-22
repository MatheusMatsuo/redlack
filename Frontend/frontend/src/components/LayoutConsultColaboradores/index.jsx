import React from 'react';
import { Link } from "react-router-dom";


export const LayoutConsultColaboradores = ({  nome, email, id, nomeEquipe, dataNascimento, cargo }) => {
    if(nomeEquipe==null){
        nomeEquipe = "";
    }
  return (
    <div className="Item-container">
      <li className="Item-field"
        >Nome: {nome} <br></br>
         Email: {email} <br></br>
         Cargo: {cargo} <br></br>
         Data de Nascimento: {dataNascimento} <br></br>
        Equipe: {nomeEquipe}</li>
        <Link to={`/colaboradores/edit/${id}`}>
      <button className="btn-consult">Editar</button>
      </Link>´
    </div>
  );
};
