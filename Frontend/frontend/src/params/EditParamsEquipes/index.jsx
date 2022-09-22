import { useParams } from "react-router-dom"
import { EditEquipes } from "../../pages/Equipe/Edit";



export const EditParamsEquipes =() =>{

    const params = useParams();

    return(
        <EditEquipes id={`${params.id}`}/>
    );
}