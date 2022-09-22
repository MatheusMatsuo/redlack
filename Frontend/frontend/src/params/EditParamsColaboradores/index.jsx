import { useParams } from "react-router-dom"
import { EditColaboradores } from "../../pages/Colaborador/Edit";



export const EditParamsColaboradores =() =>{

    const params = useParams();

    return(
        <EditColaboradores id={`${params.id}`}/>
    );
}