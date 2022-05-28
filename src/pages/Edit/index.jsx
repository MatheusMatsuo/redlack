import { LayoutComponents } from "../../components/LayoutComponents"
import { useState } from 'react';
import jpIMG from '../../assets/celta.png';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";


export const Edit = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return(
        <div>
        <LayoutMenuNav/>
        <LayoutComponents>
             <form className="login-form">
                <span className="login-form-title">Editar Usuário</span>
                <span className="login-form-title">
                    <img src={jpIMG} alt="Jovem Programador" />
                </span>

               <div className="wrap-input">
                    <input className={name !== "" ? 'has-val input' : 'input'} type="name" value={name} onChange={e => setName(e.target.value)} />
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">
                    <input className={email !== "" ? 'has-val input' : 'input'} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input className={password !== "" ? 'has-val input' : 'input'} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="container-login-form-btn">
                    <button className="login-form-btn">Salvar</button>
                </div>
            </form>
        </LayoutComponents>
        </div>
    )
}