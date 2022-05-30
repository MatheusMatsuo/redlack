import { useEffect, useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { BASE_URL } from '../../utils/requests';
import { LayoutMenuNav } from "../../components/LayoutMenuNav";
import axios from "axios";
import { LayoutList } from "../../components/LayoutList";



export const Consult = () => {

    const [usuario, setUsuario] = useState();

    useEffect(() => {
        axios.get(`${BASE_URL}/usuarios`)
            .then(response => {
                setUsuario(response);
            });
    },);

    return (
        <div>
            <LayoutMenuNav />
            <LayoutComponents>
                <LayoutList usuarios={`${usuario}`} />
            </LayoutComponents>
        </div>
    );

}