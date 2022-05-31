import { Nav } from '../Nav'
import './styles.css'



export const LayoutMenuNav = () => {

    return (
        <div>
            <div id="viewport">
                <div id="sidebar">
                    <header>
                        <div className="redlack-titulo">
                        <a href="/register">Redlack</a>
                        </div>
                    </header>
                    <ul class="nav">
                        <li>
                            <a href="/consult">
                                <i class="zmdi zmdi-view-usuario"></i> Usuários
                            </a>
                        </li>
                        <li>
                            <a href="/consult">
                                <i class="zmdi zmdi-colaboradores"></i> Colaboradores
                            </a>
                        </li>
                        <li>
                            <a href="/consult">
                                <i class="zmdi zmdi-equipes"></i> Equipes
                            </a>
                        </li>
                        <li>
                            <a href="/consult">
                                <i class="zmdi zmdi-tarefas"></i> Tarefas
                            </a>
                        </li>

                    </ul>
                </div>

                <div id="content">
                        <div class="container-fluid">
                            <Nav />
                        </div>
                </div>
            </div>
        </div>


    )
}
