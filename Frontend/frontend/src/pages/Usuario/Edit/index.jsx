import { LayoutComponents } from "../../../components/LayoutComponents";
import jpIMG from "../../../assets/logo.png";
import { LayoutMenuNav } from "../../../components/LayoutMenuNav";
import { validateEmail } from "../../../utils/validade";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, accessToken } from "../../../services/api";
import { Alert } from "bootstrap";

export const Edit = ({ id }) => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState();

  useEffect(() => {
    if (accessToken() == null) {
      navigate("/login");
    }
    api.get(`/usuarios/${id}`).then((response) => {
      setUsuario(response.data);
    });
  }, [id]);

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const nome = event.target.nome.value;
    const senha = event.target.senha.value;

    if (!validateEmail(email)) {
      return;
    }

    const data = {
      nome: nome,
      email: email,
      senha: senha,
  };

  api
    .put(`/usuarios/${id}`, data)
    .then(res =>  {
      Alert.alert("sucesso", "Cadastrsdo")
     navigate('/consult')
     })
    .catch((err) => {
      alert(err.response.data.message)
      console.log(err);
  });

    console.log(api.defaults);
};

  const handleSubmitDelet = (event) => {
    event.preventDefault();
    var resultado = window.confirm("Deseja excluir o usuário ?");

    if(resultado == true){
    api
    .delete(`/usuarios/${id}`)
    .then(res => {
      alert('Usuário',{ buttons: { Ok: false }});
      navigate('/consult')
    })
    .catch((err) => console.log(err.message));
    }

};

  return (
    <div>
      <LayoutMenuNav />
      <LayoutComponents>
        <form className="login-form" onSubmit={handleSubmitUpdate}>
          <span className="login-form-title">Editar Usuário</span>
          <span className="login-form-title">
            <img src={jpIMG} alt="Jovem Programador" />
          </span>

          <div className="wrap-input">
            <label htmlFor="nome">Informe seu nome</label>
            <input
              type="nome"
              className="has-val input"
              id="nome"
              value={usuario?.nome}
              onChange={() => setUsuario().nome}
              required
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="email">Informe seu email</label>
            <input
              type="email"
              className="has-val input"
              id="email"
              value={usuario?.email}
              onChange={() => setUsuario().nome}
              required
            />
          </div>

          <div className="wrap-input">
            <label htmlFor="senha">Informe sua senha</label>
            <input
              type="password"
              className="has-val input"
              id="senha"
              onChange={() => setUsuario().nome}
              required
            />
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Editar
            </button>
          </div>
          <div className="container-login-form-btn">
            <button className="login-form-btn" data-dismiss="alert" onClick={handleSubmitDelet}>
              Deletar
            </button>
          </div>
        </form>
      </LayoutComponents>
    </div>
  );
};
