import { useEffect, useState } from "react";
import { BASE_URL } from '../../utils/requests';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";
import axios from "axios";
import { LayoutConsult } from "../../components/LayoutConsult";
import { Link } from "react-router-dom";



export const Consult = () => {

    const [usuario, setUsuario] = useState([]);
    const [aux, setAux] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/usuarios`)
            .then(response => {
                setUsuario(response.data);
                console.log(usuario)
            });
    }, [aux]);

    return (
        <div>
            <LayoutMenuNav />
                <div className="wrap-login-consult">
                <button className="login-form-btn" style={{ marginBottom: "15px" }} onClick={() => setAux(aux + 1)}>
                    Consultar
                </button>
                <Link to="/register">
                    <div className="container-login-form-btn">
                        <button className="login-form-btn">Cadastrar</button>
                    </div>
                </Link>

                <div >
                    <ul>
                    {usuario.map(( us=> (
                        <LayoutConsult
                            key={us.id}
                            nome={us.nome}
                            email={us.email}
                            id={us.id}
                        />
                    )))}
                    </ul>
                </div>
                </div>
        </div>
    );

}