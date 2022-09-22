import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LayoutMenuNav } from '../components/LayoutMenuNav'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Consult } from '../pages/Consult'
import { EditParams } from '../params/EditParams'
import { ConsultColaboradores } from '../pages/Colaborador/Consult'
import { RegisterColaboradores } from '../pages/Colaborador/Register'
import { EditParamsColaboradores } from '../params/EditParamsColaboradores'
import { ConsultEquipes } from '../pages/Equipe/Consult'


export const AppRouter = () => {

    return(
       <Router>
           <Routes>
               <Route path="/login" exact element={<Login />} />
               <Route path="/register" exact element={<Register />} />
               <Route path="/menu" exact element={<LayoutMenuNav />} />
               <Route path="/consult" exact element={<Consult />} />
               <Route path="/" exact element={<Login />} />
               <Route path="/edit">
                     <Route path=":id" exact element={<EditParams/>} />
               </Route>

               <Route path="/colaboradores/consult" exact element={<ConsultColaboradores />} />
               <Route path="/colaboradores/register" exact element={<RegisterColaboradores />} />
               <Route path="/colaboradores/edit">
                     <Route path=":id" exact element={<EditParamsColaboradores/>} />
               </Route>

               <Route path="/equipes/consult" exact element={<ConsultEquipes />} />
               <Route path="/equipes/edit">
                     <Route path=":id" exact element={<EditParamsColaboradores/>} />
               </Route>
           </Routes>
       </Router>
    )
}