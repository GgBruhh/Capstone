import React from "react";
import {Link} from 'react-router-dom'
import "./AniCard.css"


function AniCard({shows}){

    

    const {show_name, show_id, img_src} = shows;

    return(
        <div className="ani-card-container">
            <div className="show-card">
                <Link to={`/show/${show_id}`}>
                <img src={img_src} alt={show_name} />
                </Link>
                <p>{show_name}</p>
            </div>
        </div>
    )
}


export default AniCard;