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
    const imgSrc = show.show.coverImage.extraLarge
    console.log(show)
    const title = checkTitle(show)
    const id = show.show.id;
    console.log(id)
    console.log(title)
    return(
        <div class="card-container">
            <div class="show-card">
                <Link to={`/show/${id}`}>
                <img src={imgSrc} alt={title} />
                </Link>
                <p>{title}</p>
            </div>
        </div>
    )
}


export default ShowCard;