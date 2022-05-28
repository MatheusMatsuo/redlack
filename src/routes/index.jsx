import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LayoutMenuNav } from '../components/LayoutMenuNav'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Edit } from '../pages/Edit'

export const AppRouter = () => {
    return(
       <Router>
           <Routes>
               <Route path="/login" exact element={<Login />} />
               <Route path="/register" exact element={<Register />} />
               <Route path="/menu" exact element={<LayoutMenuNav />} />
               <Route path="/edit" exact element={<Edit />} />
           </Routes>
       </Router>
    )
}