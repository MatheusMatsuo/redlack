import { useParams } from "react-router-dom"
import { SaveEditEquipes } from "../../pages/Equipe/SaveEdit";



export const SaveEditParamsEquipes =() =>{

    const params = useParams();

    return(
        <SaveEditEquipes id={`${params.id}`}/>
    );
}