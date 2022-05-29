import { useParams } from "react-router-dom"
import { LayoutEdit } from "../../components/LayoutEdit";


export const Edit =() =>{

    const params = useParams();

    return(
        <LayoutEdit id={`${params.id}`}/>
    );
}