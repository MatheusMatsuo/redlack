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
                            <a href="/edit">
                                <i class="zmdi zmdi-view-dashboard"></i> Usuários
                            </a>
                        </li>
                        <li>
                            <a href="/edit">
                                <i class="zmdi zmdi-link"></i> Colaboradores
                            </a>
                        </li>
                        <li>
                            <a href="/edit">
                                <i class="zmdi zmdi-widgets"></i> Equipes
                            </a>
                        </li>
                        <li>
                            <a href="/edit">
                                <i class="zmdi zmdi-calendar"></i> Tarefas
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
