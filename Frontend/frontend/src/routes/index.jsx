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
import { SaveEditParamsEquipes } from '../params/SaveEditParamsEquipes'
import { SaveEditEquipes } from '../pages/Equipe/SaveEdit'
import { AddRemoveRequipesColab } from '../params/AddRemoveEquipesColab'
import { AddEquipeColabParams } from '../params/AddEquipesColabParams'


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
               <Route path="/equipes/saveEdit" exact element={<SaveEditEquipes />} />
               <Route path="/equipes/saveEdit">
                     <Route path=":id" exact element={<SaveEditParamsEquipes/>} />
               </Route>
               <Route path="/equipes">
                     <Route path=":id/colaboradores" exact element={<AddRemoveRequipesColab/>} />
               </Route>
               <Route path="/equipes">
                     <Route path=":id/colaboradores/add" exact element={<AddEquipeColabParams/>} />
               </Route>
           </Routes>
       </Router>
    )
}