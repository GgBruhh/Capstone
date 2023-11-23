import React from 'react';
import './ShowCard.css';
import {Link} from 'react-router-dom'

function ShowCard(show){

    function checkTitle(show){

        if(show.show.title.english){
            const title = show.show.title.english;
            return title;
        }else{
            const title = show.show.title.romaji
            return title;
        }
    }
    const imgSrc = show.show.coverImage.extraLarge;
    const title = checkTitle(show)
    const id = show.show.id;
    return(
            <div className="show-card">
                <Link to={`/show/${id}`}>
                <img src={imgSrc} alt={title} />
                </Link>
                <p>{title}</p>
            </div>
    )
}


export default ShowCard;