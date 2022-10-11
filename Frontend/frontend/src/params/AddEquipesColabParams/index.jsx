import { useParams } from "react-router-dom"
import { AddEquipeColab } from "../../pages/Equipe/AddEquipeColab";





export const AddEquipeColabParams =() =>{

    const params = useParams();

    return(
        <AddEquipeColab id={`${params.id}`}/>
    );
}