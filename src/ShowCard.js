import React from 'react';
import './ShowCard.css';
import {Link} from 'react-router-dom'

function ShowCard(show){

    function checkTitle(show){

        //checks if there is an english title in the data if not renders romaji title
        if(show.show.title.english){
            const title = show.show.title.english;
            return title;
        }else{
            const title = show.show.title.romaji
            return title;
        }
    }
    //deconstructing data
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