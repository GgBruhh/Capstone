import React from "react";
import {useParams} from 'react-router-dom';
import AnilistApi from "./Api";


function ShowDescription(){

    const {id} = useParams();

    async function retrieveData(id){
        const result = await AnilistApi.searchId(id);
        console.log(result)
        return result;
    }

    retrieveData(id)

    console.log(id)
    return(
        <div>
            <h1>This is the Show Description</h1>
        </div>
    )
}


export default ShowDescription;