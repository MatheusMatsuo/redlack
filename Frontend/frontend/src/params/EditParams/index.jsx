import { useParams } from "react-router-dom"
import { Edit } from "../../pages/Edit";


export const EditParams =() =>{

    const params = useParams();

    return(
        <Edit id={`${params.id}`}/>
    );
}