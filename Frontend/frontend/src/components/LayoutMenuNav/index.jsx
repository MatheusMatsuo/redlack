import { Nav } from '../Nav'
import './styles.css'



export const LayoutMenuNav = () => {

    return (
        <div>
            <div id="viewport">
                <div id="sidebar">
                    <header>
                        <div className="redlack-titulo">
                        <a href="/consult">Redlack</a>
                        </div>
                    </header>
                    <ul className="nav">
                        <li>
                            <a href="/consult">
                                <i className="zmdi zmdi-view-usuario"></i> Usuários
                            </a>
                        </li>
                        <li>
                            <a href="/colaboradores/consult">
                                <i className="zmdi zmdi-colaboradores"></i> Colaboradores
                            </a>
                        </li>
                        <li>
                            <a href="/equipes/consult">
                                <i className="zmdi zmdi-equipes"></i> Equipes
                            </a>
                        </li>
                        <li>
                            <a href="/consult">
                                <i className="zmdi zmdi-tarefas"></i> Tarefas
                            </a>
                        </li>
                        <li>
                            <a href="/login">
                                <i className="zmdi zmdi-tarefas"></i> Logout
                            </a>
                        </li>

                    </ul>
                </div>

                <div id="content">
                        <div className="container-fluid">
                            <Nav />
                        </div>
                </div>
            </div>
        </div>


    )
}
