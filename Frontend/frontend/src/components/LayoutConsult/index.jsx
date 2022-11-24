import React from "react";
import { Link } from "react-router-dom";

export const LayoutConsult = ({ nome, email, id }) => {
  return (
    <div className="Item-container">
      <li className="Item-field">
        Nome: {nome} <br></br>
        Email: {email}
      </li>

      <Link to={`/edit/${id}`}>
        <button className="btn-consult">Ações</button>
      </Link>
    </div>
  );
};
