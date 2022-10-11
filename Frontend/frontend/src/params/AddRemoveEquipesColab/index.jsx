import { useParams } from "react-router-dom"
import { LayoutConsultEquipesColab } from "../../components/LayoutConsultEquipesColab";
import { ConsultEquipesColab } from "../../pages/Equipe/ConsultColaboradores";




export const AddRemoveRequipesColab =() =>{

    const params = useParams();

    return(
        <ConsultEquipesColab id={`${params.id}`}/>
    );
}